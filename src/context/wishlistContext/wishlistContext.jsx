import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext/userContext";
import ViewWishlist from "../../services/APIs/wishlist/viewWishlist";
import AddTOCart from "../../services/APIs/cart/addToCart";
import toast from "react-hot-toast";
import { CartContext } from "../cartContext/cartContext";
import AddToWishlist from "../../services/APIs/wishlist/addToWishlist";
import RemoveWishlist from "../../services/APIs/wishlist/removeWishlist";


export const WishlistContext=createContext();


export default function WishlistProvider({children})
{
    const [wishlistItems,setWishlistitems] =  useState([]);
    const {getToken}=useContext(UserContext);
const {isAvaStock}=useContext(CartContext);
async function fetchWishlist()
{

let token=getToken();

if(token)
{
  let res= await ViewWishlist(token);   
  if(res.succeeded){ setWishlistitems(res?.data.products); ;
   }
  
}
}
function setWishlistItemsEmpty()
{
setWishlistitems([]);
}

    useEffect(()=>{

        fetchWishlist();

        
    },[]);



     async function add_Wishlit_To_Cart()
    {
        let token = getToken();
toast(
  "Please wait, we are adding products to your cart...",
  {
    duration: 3000,
  }
);    
console.log(wishlistItems);
    if (token) {
            let AddedAll = 0;
            for (const item of wishlistItems) {
                
if(!await isAvaStock(item.productId)) {toast.error(`No enough stock for ${item.productName.split(" ").splice(0,2).join(" ")}`); continue;}

                let res = await AddTOCart({
                    "productId": item.productId,
                    "quantity": 1
                }, token);
                if (!res.succeeded) {
                    toast.error(`Unable to add *  ${item.productName.split(" ").splice(0,2).join(" ")} * to cart`);
                } else {
                    AddedAll++;
                }
            }
            console.log(AddedAll, wishlistItems.length);
            if(AddedAll ==0) toast.error("there is Nothing to add.")
            else if (  AddedAll === wishlistItems.length) {
                toast.success("All Products added to cart");
            }
        }   
    }



    
  async function AddTOWishlist(data,name)
  {     
    let token =getToken();
    if(token){  
      let res =await AddToWishlist(data,token);
      if(res.succeeded) {toast.success('Successfully added to wishlist!');fetchWishlist();}
else  if(res.statusCode!=200) toast.error( res.message ||`Unable  add ${name} to wishlist  `)
       }
  }

  async function DeleteFromWishlist(id,name)
  {     
    
    let token =getToken();  
    if(token){  
      let res =await RemoveWishlist({productId:id},token);
      if(res.succeeded) {toast.success('Successfully removed from wishlist!');fetchWishlist();}
else  if(res.statusCode!=200) toast.error(`Unable  delete ${name}   `)
  }
  }
  

return  (  <WishlistContext.Provider value={{wishlistItems,fetchWishlist,add_Wishlit_To_Cart,DeleteFromWishlist,AddTOWishlist,setWishlistItemsEmpty}}>
            {children}
        </WishlistContext.Provider>)
}