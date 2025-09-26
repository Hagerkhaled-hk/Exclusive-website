import "./css/cart.css";
import DynamicIndex from  "../../Common/DynamicIndex/DynamicIndex"
import BlackButton from "../../Common/blackButton/blackButton";
import {  useContext, useEffect, useRef, useState,  } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import TotalDetails from "../../Common/totalDetails/totalDetails";
import RedButton from "../../Common/redButton/redButton";

import CartProduct from "../../Common/cartProduct/cartProduct";
import AddToOrder from "../../services/APIs/orders/addOrder";
import ApplyDiscount from "../../services/APIs/discount/applyDiscount";
import { UserContext } from "../../context/userContext/userContext";
import LoadingModal from "../../Common/modal/modal";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export default function Cart()
{
  const {cartItems,cartInfo,setCart_Info_State } = useContext(CartContext);
const{getToken} =useContext(UserContext);
const coupounRef=useRef();
const [loading,setLoading]=useState(true);
const navigate = useNavigate();

  async function processOrder()
  {


navigate("/Payment");

  }

  async function applyDiscount()
  {let data=[];
    cartItems.map((item,index)=>{

         data.push(item.productId) ;
    });
    console.log(data);
    
    let res =await ApplyDiscount({
  "code": coupounRef.current.value,
  "productIds": data
});
setCart_Info_State();
    console.log("order",res);
    

  }

  useEffect(()=>{
setTimeout(() => {
  setLoading(false);
}, 2000);
  },[]);

  

   

    return <div className="Cart-container "> 
    
<Toaster
  position="top-center"
  reverseOrder={false}
/>     <DynamicIndex page={["Home","Cart"]} />
     {
!cartItems.length?
<LoadingModal loading={loading} text={"Your cart is empty"} />

:

<div className="container cart-container ">
<div className="cart-wrapper">
        <table className="cart-table">
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

<BlackButton text={"Return to shop"}/>


    </div>

    </div>
    
    <div className="right">
    <div className="total">
        <p>Cart total</p>

<TotalDetails total={cartInfo.total} subTotal={cartInfo.subtotal} />
<RedButton text="Processed to check"  btn_Function={processOrder}/>
    </div>

    <div className="coupoun">
        <input type="text" ref={coupounRef} placeholder="Coupoun"  />
        <RedButton text="Apply Coupoun" btn_Function={applyDiscount}/>
    </div>
    </div>

        </div>
}
        </div>}