import { useContext, useEffect, useState } from "react";
import GetAnOrder from "../../../../services/APIs/orders/getOrder";
import "./currentOrder.css";
import { UserContext } from "../../../../context/userContext/userContext";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../../../../Common/modal/modal";

export default function CurrentOrder() {
  const { getToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id,order_num } = useParams();
const navigate = useNavigate();
  async function get_order() {
    let token = getToken();
    if (!token) return;
    let res = await GetAnOrder(id, token);
    setOrders(res?.data.items || []);
  }

  useEffect(() => {
    get_order();

    setTimeout(() => {
     setLoading(false);
    }, 2000);
  }, [id]);

  return (
    <div className="currentOrder-container">

{
      orders.length ==0?
      
    <LoadingModal loading={loading} text={"order"} />
    :
      <>
  <h2>Order {order_num} </h2>

       <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to see more information.</small>
      <table className="order-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, idx) => (
              <tr onClick={()=>{navigate(`/product/${order.productId}`)}} key={order.productId || idx}>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.unitPrice}</td>
                <td>${order.subtotal}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </>
}
    </div>
  );
}