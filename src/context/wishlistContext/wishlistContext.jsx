import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext/userContext";
import ViewWishlist from "../../services/APIs/wishlist/viewWishlist";


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

return  (  <WishlistContext.Provider value={{wishlistItems,fetchWishlist}}>
            {children}
        </WishlistContext.Provider>)
}