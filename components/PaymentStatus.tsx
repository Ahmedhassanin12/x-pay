import type { PaymentStatusType } from "@/types/payment.type";

const PaymentStatus = ({ status }: { status: PaymentStatusType }) => {
  return (
    <span className={`status status-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default PaymentStatus;
