import { memo, useContext, useEffect, useMemo, useState } from "react";
import "./orderState.css";
import { PaymentContext } from "../../context/paymentContext/paymentContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import { ImCross } from "react-icons/im";
import { MdDoneOutline } from "react-icons/md";
import AddToOrder from "../../services/APIs/orders/addOrder";



export default function OrderState()
{
 const {form,is_From_PaymentPage,set_Is_From_PaymentPage}=useContext(PaymentContext);
 const navigate=useNavigate();
 const {getToken}=useContext(UserContext);
 const [success ,setSuccess]=useState({"isSuccess":undefined , "message":""});


    useEffect(()=>{

let  Confirmed=  (localStorage.getItem("is_From_PaymentPage") ?? is_From_PaymentPage);
console.log("confi", Confirmed );

/*  if (!Confirmed)  navigate("/account/allOrders");
 */ 

(async()=>{
   let token =getToken();
    
let user_Address_Payment =JSON.parse(localStorage.getItem("user_Address_Payment"))|| {"streetAddress":form.streetAddress,"postalCode":form.postalCode};

console.log("user_Address_Payment",user_Address_Payment);
console.log(token);

if(!user_Address_Payment) return;

  let res= await AddToOrder({
"shippingAddress": user_Address_Payment["streetAddress"],
 "shipPostalCode": user_Address_Payment["postalCode"]
},token);

console.log(res);
if(res.statusCode!=200)setSuccess({"isSuccess":false , "message":res.message});
else setSuccess({"isSuccess":true , "message":""});


})()
 setTimeout(()=>{
set_Is_From_PaymentPage(false);
localStorage.removeItem("is_From_PaymentPage");
},5000) 
    },[]
)
 

    return  <div className={`OrderState card ${success?.isSuccess ? "success" : "failed"}`} role="status" aria-live="polite">
        <div className="card-content">
          {


          success?.isSuccess ? (
            <>
              <MdDoneOutline className="icon" />
              <p className="message">Your order is Do ne</p>
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