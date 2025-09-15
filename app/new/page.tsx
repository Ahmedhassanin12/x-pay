"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createPayment } from "../../actions/payments";

export default function NewPayment() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const payment = await createPayment(formData);
      router.push(`/payments/${payment.id}`);
      return payment;
    },
    null,
  );

  return (
    <div>
      <h1>Create New Payment</h1>
      <form action={formAction}>
        <div>
          <label className="form-label" htmlFor="amount">Amount (cents)</label>
          <input type="number" id="amount" name="amount" required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="merchantOrderId">Your Order ID</label>
          <input
            type="text"
            id="merchantOrderId"
            name="merchantOrderId"
            required
            className="form-input"
          />
        </div>
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "16px" }}>

          <button style={{ textAlign: 'center', margin: "8px" }} className="btn btn-succuss" type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
