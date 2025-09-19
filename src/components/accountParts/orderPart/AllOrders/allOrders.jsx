import "./allOrders.css";

export default function AllOrders() {
  const orders = [
    {
      id: 1,
      createdAt: "12 May 2024",
      total: "$120.00",
      status: "Pending",
    },
    {
      id: 2,
      createdAt: "15 May 2024",
      total: "$75.50",
      status: "In progress",
    },
    {
      id: 3,
      createdAt: "14 May 2024",
      total: "$200.00",
      status: "Completed",
    },
    {
      id: 4,
      createdAt: "16 May 2024",
      total: "$50.00",
      status: "Cancelled",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In progress":
        return "status-inprogress";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="AllOrders">
      <h2>Current Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Created At</th>
            <th>Total</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.createdAt}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button
                  className="cancel-btn"
                  disabled={order.status !== "Pending" && order.status !== "In progress"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}