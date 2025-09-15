import type { Payment } from "@/types/payment.type";
import { generateId } from "./id";

declare const global: typeof globalThis & {
  __XPAY_PAYMENTS__?: Payment[];
  __XPAY_DATA_INIT__?: boolean;
};

let payments: Payment[] = global.__XPAY_PAYMENTS__ ?? [];
let dataInitialized = global.__XPAY_DATA_INIT__ ?? false;

export function getPayments(): Payment[] {
  if (!dataInitialized) {
    payments = [
      {
        id: generateId("pay"),
        publicId: generateId("pub"),
        amount: 1000,
        currency: "EGP",
        status: "pending",
        merchantOrderId: "ORDER_001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId("pay"),
        publicId: generateId("pub"),
        amount: 2500,
        currency: "EGP",
        status: "paid",
        merchantOrderId: "ORDER_002",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    dataInitialized = true;
    // persist on global to avoid reset during dev HMR
    global.__XPAY_PAYMENTS__ = payments;
    global.__XPAY_DATA_INIT__ = dataInitialized;
  }

  return payments;
}

export async function searchPayments(merchantOrderId?: string, status?: string): Promise<Payment[]> {

  return getPayments().filter(payment => {
    const matchesOrderId = !merchantOrderId ||
      payment.merchantOrderId.toLowerCase().includes(merchantOrderId.toLowerCase());
    const matchesStatus = !status || payment.status === status;
    return matchesOrderId && matchesStatus;
  });
}

export async function getPaymentById(id: string): Promise<Payment | undefined> {
  return getPayments().find((p) => p.id === id);
}

export async function getPaymentByPublicId(publicId: string): Promise<Payment | undefined> {
  const list = getPayments();
  return list.find((p) => p.publicId === publicId);
}

export async function addPayment(
  payment: Omit<Payment, "id" | "publicId" | "createdAt" | "updatedAt">,
): Promise<Payment> {
  const newPayment: Payment = {
    ...payment,
    id: generateId("pay"),
    publicId: generateId("pub"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  payments.push(newPayment);
  global.__XPAY_PAYMENTS__ = payments;
  return newPayment;
}

export async function updatePaymentStatus(
  id: string,
  status: "paid" | "canceled",
): Promise<Payment | undefined> {
  const payment = payments.find((p) => p.id === id);
  if (payment) {
    payment.status = status;
    payment.updatedAt = new Date().toISOString();
    global.__XPAY_PAYMENTS__ = payments;
    return payment;
  }
  return undefined;
}
