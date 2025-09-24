import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext/userContext";
import ViewWishlist from "../../services/APIs/wishlist/viewWishlist";
import AddTOCart from "../../services/APIs/cart/addToCart";
import toast from "react-hot-toast";


export const WishlistContext=createContext();


export default function WishlistProvider({children})
{
    const [wishlistItems,setWishlistitems] =  useState([]);
    const {getToken}=useContext(UserContext);

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


    useEffect(()=>{

        fetchWishlist();

        
    },[]);



     async function add_Wishlit_To_Cart()
    {
        let token = getToken();
toast(
  "Please wait, we are adding products to your cart...",
  {
    duration: 6000,
  }
);        if (token) {
            let AddedAll = 0;
            for (const item of wishlistItems) {
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

            if (AddedAll === wishlistItems.length) {
                toast.success("All Products added to cart");
            }
        }   
    }

return  (  <WishlistContext.Provider value={{wishlistItems,fetchWishlist,add_Wishlit_To_Cart}}>
            {children}
        </WishlistContext.Provider>)
}