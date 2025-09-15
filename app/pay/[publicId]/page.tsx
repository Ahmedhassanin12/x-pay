import { notFound } from "next/navigation";
import { markPaymentAsCanceled, markPaymentAsPaid } from "../../../actions/payments";
import { getPaymentByPublicId } from "../../../lib/db";

interface PageProps {
  params: { publicId: string };
}

export default async function PaymentLink({ params }: PageProps) {
  const payment = await getPaymentByPublicId(params.publicId);
  console.log(params.publicId)
  if (!payment) {
    notFound();
  }

  if (payment.status !== "pending") {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
        height: "100%"
      }}>
        <h1>
          Payment Already{" "}
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </h1>
        <p>This payment has already been processed.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Payment Request</h1>
      <p className="info-card">
        <strong> Amount:</strong> {(payment.amount / 100).toFixed(2)} {payment.currency}
      </p>
      <p className="info-card"><strong>Order ID:</strong> {payment.merchantOrderId}</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
        <form
          action={async () => {
            "use server";
            await markPaymentAsCanceled(payment.id);
          }}
        >
          <button className="btn btn-danger" type="submit">
            Cancel Payment
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await markPaymentAsPaid(payment.id);
          }}
        >
          <button className="btn btn-primary" type="submit">
            Mark as Paid
          </button>
        </form>


      </div>
    </div>
  );
}
