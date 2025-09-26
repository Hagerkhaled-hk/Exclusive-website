import { useContext, useEffect, useState } from "react";
import "./currentOrder.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../../../../Common/modal/modal";
import TotalDetails from "../../../../Common/totalDetails/totalDetails";
import { OrderContext } from "../../../../context/orderContext/orderContext";

export default function CurrentOrder() {

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const{current_Order_index,get_order,currentOrder,getIndexOfOrder}=useContext(OrderContext);
const navigate = useNavigate();



  useEffect(() => {
  
 get_order(id);
 getIndexOfOrder(id);

    setTimeout(() => {
     setLoading(false);
    }, 2000);


  }, [id]);

  return (
    <div className="currentOrder-container">

{
      currentOrder?.items?.length ==0?
      
    <LoadingModal loading={loading} text={"order"} />
    :
      <>
  <h2>Order { current_Order_index} </h2>

       <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to see more information.</small>
       <section>
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
          {currentOrder?.items?.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No orders found.
              </td>
            </tr>
          ) : (
            currentOrder?.items?.map((order, idx) => (
              <tr onClick={()=>{navigate(`/product/${order.productId}`)}} key={order.productId || idx}>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.unitPrice} EGP</td>
                <td>{order.subtotal} EGP</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
<div className="order-summary">
<p style={{fontFamily:"var(--Inter-regular)"}} >Order Summary</p>
      <TotalDetails total={(currentOrder?.total)?.toFixed(1)} subTotal={(currentOrder?.subtotal)?.toFixed(1)} 
      shipPostalCode={currentOrder.shipPostalCode} shippingAddress={currentOrder.shippingAddress} discountAmount={currentOrder.discountAmount } createdAt={currentOrder.createdAt}

      />
</div>
</section>

      </>
}
    </div>
  );
}