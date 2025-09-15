import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import PaymentStatus from "@/components/PaymentStatus";
import { getPaymentById } from "../../../lib/db";

interface PageProps {
  params: { id: string };
}

export default async function PaymentDetails({ params }: PageProps) {
  const payment = await getPaymentById(params.id);
  console.log({ id: params.id, payment });

  if (!payment) {
    notFound();
  }

  const paymentLink = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/${payment.publicId}`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
          borderBottom: "1px solid #161616",
        }}
      >
        <h1>Payment Details</h1>
        <Link href="/" style={{ color: "white" }}>
          Back to Payments
        </Link>
      </div>

      <div>
        <h3 style={{ padding: "8px" }}>Payment Information:</h3>
        <p className="info-card">
          <strong>System ID:</strong> {payment.id}
        </p>
        <p className="info-card">
          <strong>Your Order ID:</strong> {payment.merchantOrderId}
        </p>
        <p className="info-card">
          <strong>Amount:</strong> {(payment.amount / 100).toFixed(2)}{" "}
          {payment.currency}
        </p>
        <p className="info-card">
          <strong>Status:</strong> <PaymentStatus status={payment.status} />
        </p>
        <p className="info-card">
          <strong>Created:</strong>{" "}
          {new Date(payment.createdAt).toLocaleString()}
        </p>
        <p className="info-card">
          <strong>Updated:</strong>{" "}
          {new Date(payment.updatedAt).toLocaleString()}
        </p>
      </div>

      <h3>Payment Link</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
        <p style={{ padding: "8px", backgroundColor: "#141414" }}>
          {paymentLink}
        </p>
        <CopyButton text={paymentLink} />
      </div>

      <div>
        <h3>Activity</h3>
        <ul
          style={{
            paddingLeft: "32px",
          }}
        >
          <li>
            <span style={{ color: "#e3cb12" }}>Payment created -</span>{" "}
            {new Date(payment.createdAt).toLocaleString()}
          </li>
          {payment.status !== "pending" && (
            <li>
              <span style={{ color: "#e3cb12" }}>
                Payment {payment.status} -
              </span>{" "}
              {new Date(payment.updatedAt).toLocaleString()}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
