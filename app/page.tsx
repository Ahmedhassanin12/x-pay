import Link from "next/link";
import PaymentStatus from "@/components/PaymentStatus";
import { searchPayments } from "@/lib/db";

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string };
}) {
  const resolvedSearchParams = await searchParams;

  const payments = await searchPayments(
    resolvedSearchParams?.q,
    resolvedSearchParams?.status,
  );

  return (
    <div>
      <div className="card">
        <h1>X-Pay Mini Payment Console</h1>
        <p>Manage your payment transactions</p>
      </div>

      <div className="card">
        <h2>Search & Filter</h2>
        <form method="GET" className="filters">
          <div className="filter-group">
            <label htmlFor="q" className="form-label">
              Search by Your Order ID
            </label>
            <input
              type="text"
              id="q"
              name="q"
              className="form-input"
              defaultValue={resolvedSearchParams?.q || ""}
              placeholder="Enter order ID..."
            />
          </div>
          <div className="filter-group">
            <label htmlFor="status" className="form-label">
              Filter by Status
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              defaultValue={resolvedSearchParams?.status || ""}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="filter-group">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "2rem", width: "130px" }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>System ID</th>
            <th>Your Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.merchantOrderId}</td>
              <td>
                {(payment.amount / 100).toFixed(2)} {payment.currency}
              </td>
              <td>
                <PaymentStatus status={payment.status} />
              </td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              <td>
                <Link
                  style={{ color: "white" }}
                  href={`/payments/${payment.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <p style={{ textAlign: "center", fontWeight: 700 }}>
          No payments found
        </p>
      )}
    </div>
  );
}
