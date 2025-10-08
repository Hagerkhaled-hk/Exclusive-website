import {  useEffect, useState } from "react";
import "./orderCurrentTable.css";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/modal";
import TotalDetails from "../totalDetails/totalDetails";

export default function OrderCurrentTable({Get_order,currentOrder,id}) {

const navigate = useNavigate();

const[loading,setLoading]=useState(true);
  useEffect(() => {
  console.log("admin");
  
Get_order();

setTimeout(()=>{
  setLoading(false);
})

  }, [id]);

  return (
    <div className="currentOrder-container">

{
      Object.keys(currentOrder).length === 0 ?
      
    <LoadingModal loading={true}  mainText="Something went wrong." />
    :
      <>
  <h2>Order </h2>

   <p>    <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to see more information.</small></p>
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
          {currentOrder?.count === 0   ? (
            <tr> 
              <td colSpan="5" className="no-orders">
                No orders found.
              </td>
            </tr>
         ) :
         currentOrder?.items?.length==0?
<tr>
  <td colSpan="5" >

<LoadingModal loading={loading} mainText="Something went wrong" />
  </td>
</tr>
         :
         
         (
            currentOrder?.items?.map((order, idx) => (
              <tr onClick={()=>{navigate(`/product/${order.productId}`)}} key={order.productId || idx}>
                <td data-label="product:">{order.productName}</td>
                <td data-label="Quantity: ">{order.quantity}</td>
                <td data-label="Price:">{order.unitPrice} EGP</td>
                <td data-label="SubTotal:">{order.subtotal} EGP</td>
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