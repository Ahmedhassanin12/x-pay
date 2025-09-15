
export type PaymentStatusType = 'pending' | 'paid' | 'canceled'

export type PaymentCurrencies = "EGP"

export type Payment = {
  id: string;
  publicId: string;
  amount: number;
  currency: PaymentCurrencies;
  status: PaymentStatusType;
  merchantOrderId: string;
  createdAt: string;
  updatedAt: string;
};