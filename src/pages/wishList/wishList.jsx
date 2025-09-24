import { useContext, useEffect, useState } from "react";
import BlackButton from "../../Common/blackButton/blackButton";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import ProductCards from "../../components/ProductCards/ProductCards";
import { WishlistContext } from "../../context/wishlistContext/wishlistContext";
import "./wishList.css";
import {  useNavigate } from "react-router-dom";

import { FaRegTrashCan } from "react-icons/fa6";
import HomeHeader from "../../Common/homeHeader/homeHeader";
import { ProductContext } from "../../context/productContext/productContext";
import LoadingModal from "../../Common/modal/modal";
export default function Wishlist()
{
 
const {wishlistItems,add_Wishlit_To_Cart}=useContext(WishlistContext);

const {products}=useContext(ProductContext);
const Navigate=useNavigate(null);
const [loading,setLoading]=useState(true);

useEffect(()=>{
    setTimeout(() => {
setLoading(false);
    }, 2000);
},[])


    return <div className="Wishlist"> 
    <div className="top">

<DynamicIndex page={["home","wishList"]} />


<BlackButton text={"Move all to Cart"} btn_Function={ ()=>{add_Wishlit_To_Cart()}} />
    </div>



    <div className="bottom">

    <div className="wishlistItmes">
{
 wishlistItems.length==0?
<LoadingModal loading={loading} text={"Your wishlist is empty "}  />
:
<ProductCards products={wishlistItems} />   

}
    </div>
 {

  
<div className="recommendation">

<HomeHeader note={"Just for you"} >
<BlackButton text={"See All"} btn_Function={ ()=>{Navigate("/product")}} />
    </HomeHeader>

<div className="recommendation-bottom">

<ProductCards products={products.splice(4,4)} />
</div>

</div>

 }


    </div>

    </div>
    
}