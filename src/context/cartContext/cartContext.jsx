import { createContext, useContext, useEffect, useState } from "react";
import ViewCart from "../../services/APIs/cart/viewCart";
import UpdateQunatityCart from "../../services/APIs/cart/update_Quantity_Cart";
import ProductById from "../../services/APIs/products/get_Product_Id";
import DeleteCart from "../../services/APIs/cart/deleteCart";
import { UserContext } from "../userContext/userContext";
import toast from "react-hot-toast";
import AddTOCart from "../../services/APIs/cart/addToCart";

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

      console.log("okay");
      
let token =getToken();

if(token){
      
   let res= await ProductById(payload.productId ,token);
   
   let stock=res.data.stock;
   
   let affected =false;
   const before_Cart_Affect=cartItems.map(item=>structuredClone(item) );




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
console.log(token);

      let res =await UpdateQunatityCart({
  "cartItemId":payload.cartItemId,
  "quantity":  payload.quantity+1
      },token);
console.log(res);

if (res.statusCode!==200){  
  console.log('ff');
  
  toast.error( res.message || "Couldn't update quantity - please try again!");
  setCartItem([...before_Cart_Affect]);   console.log(before_Cart_Affect);
}
else toast.success('Stocking up! Quantity updated successfully')




}else toast.error( "No enough stock avaliable ");

    
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

//For Home Product Cards
    async function addToCart(data,name)
  {

let productIndex =cartItems.findIndex((item)=>item.productId==data.productId);

if(productIndex!==-1) {Quantity_Function({ type: "add", payload: { "quantity": cartItems[productIndex].quantity, "productId": cartItems[productIndex].productId, "index": productIndex, "cartItemId": cartItems[productIndex].cartItemId } });
}
else
  {

    let token =getToken();
  if(token){
  
  let res =await AddTOCart(data,token);
  console.log(res);
  
  if(res.succeeded) {toast.success('Successfully added to cart!')
  setCart_All_State();    
  }
  
  else  if(res.statusCode!=200) toast.error( res?.message ? res.message :  `Unable  add ${name} to cart  `);
  } 
  }

  


    
  }



  return (
    <CartContext.Provider value={{setCart_All_State,cartInfo, cartItems,Quantity_Function ,Delete_From_Cart,setCart_Info_State,addToCart}}>
      {children}
    </CartContext.Provider>
  );
}