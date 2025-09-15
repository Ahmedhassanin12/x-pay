"use server";

import { revalidatePath } from "next/cache";
import type { Payment } from "@/types/payment.type";
import { addPayment, getPayments, updatePaymentStatus } from "../lib/db";

export async function createPayment(formData: FormData): Promise<Payment> {
  const amount = Number.parseInt(formData.get("amount") as string, 10);
  const merchantOrderId = formData.get("merchantOrderId") as string;

  const payment = addPayment({
    amount,
    currency: "EGP",
    status: "pending",
    merchantOrderId,
  });

  revalidatePath("/");
  return payment;
}

export async function markPaymentAsPaid(
  id: string,
): Promise<Payment | undefined> {
  const payment = updatePaymentStatus(id, "paid");
  revalidatePath("/");
  revalidatePath(`/payments/${id}`);
  return payment;
}

export async function markPaymentAsCanceled(
  id: string,
): Promise<Payment | undefined> {
  const payment = updatePaymentStatus(id, "canceled");
  revalidatePath("/");
  revalidatePath(`/payments/${id}`);
  return payment;
}

export async function getPaymentsAction(): Promise<Payment[]> {
  return getPayments();
}
