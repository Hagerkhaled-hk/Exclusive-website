import { createContext, useContext, useEffect, useState } from "react";
import ViewCart from "../../services/APIs/viewCart";
import UpdateQunatityCart from "../../services/APIs/update_Quantity_Cart";
import ProductById from "../../services/APIs/get_Product_Id";
import DeleteCart from "../../services/APIs/deleteCart";
import { UserContext } from "../userContext/userContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {

 
  
  const [cartItems,setCartItem]=useState([]);
  const [cartInfo,setCartInfo]=useState([]);
const {getToken}=useContext(UserContext);
async function setCart_All_State()
{
let token =getToken();

if(token){

  let dataCart = await ViewCart(token);
    
    setCartItem(dataCart?.data?.items);
    setCartInfo(dataCart?.data);
}

}
async function setCart_Info_State()
{

  let token =getToken();

if(token){

    let dataCart = await ViewCart(token);
    console.log("data", dataCart);
    
    setCartInfo(dataCart?.data);
}

}



   useEffect(()=>{
 setCart_All_State();

   },[]) 


async function Quantity_Function( {type,payload})
    {

      
let token =getToken();

if(token){
      
   let res= await ProductById(payload.productId ,token);
   console.log(res);
   
   let stock=res.data.stock;
   
   let affected =false;



 switch(type)
    {
         
        case "add": ( payload.quantity < stock) && (
          
          affected=true,
          
          setCartItem(()=>{
           cartItems[payload.index].quantity= payload.quantity+1; return [...cartItems]}) );
        break;
        case "minus": ( cartItems[payload.index].quantity > 1) &&( affected=true, 
          setCartItem(()=>{cartItems[payload.index].quantity= payload.quantity-1 ; 
            return [...cartItems];})  );
               break;

    } 

    if(affected)
    {
      let res =await UpdateQunatityCart({
  "cartItemId":payload.cartItemId,
  "quantity":  payload.quantity+1
,token});

setCart_Info_State();


    }

    }

  }


  async  function Delete_From_Cart(index ,cartId)
    {
let token =getToken();

if(token){
      
 cartItems.splice(index,1);
  setCartItem([...cartItems]);
 console.log(cartItems);

let res = await DeleteCart(cartId,token);
console.log(res); 

}
    }



  return (
    <CartContext.Provider value={{setCart_All_State,cartInfo, cartItems,Quantity_Function ,Delete_From_Cart,setCart_Info_State}}>
      {children}
    </CartContext.Provider>
  );
}