import { createContext, useContext, useEffect, useState } from "react";
import ViewCart from "../../services/APIs/cart/viewCart";
import UpdateQunatityCart from "../../services/APIs/cart/update_Quantity_Cart";
import ProductById from "../../services/APIs/products/get_Product_Id";
import DeleteCart from "../../services/APIs/cart/deleteCart";
import { UserContext } from "../userContext/userContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {

 
  
  const [cartItems,setCartItem]=useState([]);
  const [cartInfo,setCartInfo]=useState([]);
const {getToken,userData}=useContext(UserContext);
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
    
    setCartInfo(dataCart?.data);
}

}



   useEffect(()=>{
 setCart_All_State();

   },[userData]) 


async function Quantity_Function( {type,payload})
    {

      
let token =getToken();

if(token){
      
   let res= await ProductById(payload.productId ,token);
   
   let stock=res.data.stock;
   
   let affected =false;
   let before_Cart_Affect=cartItems;




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

  

    }

    }

  }


  async  function Delete_From_Cart(index ,cartId)
    {
let token =getToken();

if(token){
      let beforeSplice=cartItems;
 cartItems.splice(index,1);
  setCartItem([...cartItems]);

let res = await DeleteCart(cartId,token);
if(!res.succeeded) setCartItem(beforeSplice) ;


}
    }



  return (
    <CartContext.Provider value={{setCart_All_State,cartInfo, cartItems,Quantity_Function ,Delete_From_Cart,setCart_Info_State}}>
      {children}
    </CartContext.Provider>
  );
}