import { memo, Suspense, useContext, useEffect, useMemo, useState } from "react";
import "./orderState.css";
import { PaymentContext } from "../../context/paymentContext/paymentContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import { ImCross } from "react-icons/im";
import { MdDoneOutline } from "react-icons/md";
import AddToOrder from "../../services/APIs/orders/addOrder";
import { Spinner } from "react-bootstrap";
import { CartContext } from "../../context/cartContext/cartContext";



export default function OrderState()
{
 const {form,is_From_PaymentPage,set_Is_From_PaymentPage}=useContext(PaymentContext);
 const navigate=useNavigate();
 const {getToken}=useContext(UserContext);
 const [success ,setSuccess]=useState({"isSuccess":undefined , "message":""});
const{deleteAllCart}=useContext(CartContext);

    useEffect(()=>{

let  Confirmed=  (localStorage.getItem("is_From_PaymentPage") ?? is_From_PaymentPage) ;

  if (!Confirmed)  navigate("/account/allOrders");
  

(async()=>{
   let token =getToken();
    
let user_Address_Payment =JSON.parse(localStorage.getItem("user_Address_Payment"))|| {"streetAddress":form.streetAddress,"postalCode":form.postalCode};



if(!user_Address_Payment) return;

  let res= await AddToOrder({
"shippingAddress": user_Address_Payment["streetAddress"],
 "shipPostalCode": user_Address_Payment["postalCode"]
},token);

if(res.statusCode!=200)setSuccess({"isSuccess":false , "message":res.message});
else{ setSuccess({"isSuccess":true , "message":""}); localStorage.removeItem("LogOrder"); await deleteAllCart();};


})()
  setTimeout(()=>{
  navigate("/account/allOrders")
set_Is_From_PaymentPage(false);
localStorage.removeItem("is_From_PaymentPage");
},5000)  
    },[]
)
 

    return  <div className={`OrderState card ${success.isSuccess==undefined? "":  success?.isSuccess ? "success" : "failed"}`} role="status" aria-live="polite">
        <div className="card-content">
          {


          success.isSuccess==undefined?
   <Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />

          :
           
          success.isSuccess ? (
            <>
              <MdDoneOutline className="icon" />
              <p className="message">Your order is Done</p>
              <small>Taking you to orders.. </small>
            </>
          ) : (
            <>
              <ImCross className="icon" />
              <p className="message">Payment Failed</p>
              <small>{success?.message}</small>
              <small>Returning to cart...</small>
            </>
          )}
        </div>
      </div>
    
}