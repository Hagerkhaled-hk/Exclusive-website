import "./css/cart.css";
import DynamicIndex from  "../../Common/DynamicIndex/DynamicIndex"
import BlackButton from "../../Common/blackButton/blackButton";
import {  useContext, useEffect, useRef, useState,  } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import TotalDetails from "../../Common/totalDetails/totalDetails";
import RedButton from "../../Common/redButton/redButton";

import CartProduct from "../../Common/cartProduct/cartProduct";
import LoadingModal from "../../Common/modal/modal";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/userContext/userContext";
export default function Cart()
{
  const {cartItems,cartInfo } = useContext(CartContext);
const [loading,setLoading]=useState(true);
  const {isLogin}=useContext(UserContext);

const navigate = useNavigate();

  async function processOrder()
  {


navigate("/Payment");

  }

  



  useEffect(()=>{
        if(!isLogin()) navigate("/signup");
 else{ 
setTimeout(() => {
  setLoading(false);
}, 2000);
 }
  },[]);

  

   

    return <div className="Cart-container "> 
    
<Toaster
  position="top-center"
  reverseOrder={false}
/>     <DynamicIndex page={["Home","Cart"]} />
     {
!cartItems?.length?
<LoadingModal loading={loading} text={"Your cart is empty"} />

:

<div className="container cart-container ">
<div className="cart-wrapper">
        <table className="cart-table" id="Table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>

                {





cartItems.map((item,index)=>{

return(<CartProduct
item={item}
key={index}
index={index}


/>);

})
                }
                
            </tbody>
        </table>
        <div className="buttons">

<BlackButton text={"Return to shop"} btn_Function={()=>{navigate("/product")}}/>


    </div>
                
    </div>
    
    <div className="right">
    <div className="total">
        <p>Cart total</p>

<TotalDetails total={cartInfo.total} subTotal={cartInfo.subtotal} />
<RedButton text="Processed to check"  btn_Function={processOrder}/>
    </div>

   
    </div>

        </div>
}
        </div>}