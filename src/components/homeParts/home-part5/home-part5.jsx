import { useEffect, useState } from "react";
import ViewProducts from "../../../services/APIs/viewProducts";
import ProductCards from "../../ProductCards/ProductCards";
import HomeHeader from "../../../Common/homeHeader/homeHeader";
import RedButton from "../../../Common/redButton/redButton";
import { useNavigate } from "react-router-dom";

import "./HomePart5.css"
export default function HomePart5()
{

   const [products,setProducts] =  useState([]); 
   let navigate =useNavigate();
   function navigatetoProduct()
   {
navigate("/product")
   }
   useEffect(()=>{
     
 
     (async ()=>{
 let res= await  ViewProducts();
 
 
 setProducts(res.data);
 
     })()
   })

    return <div  className="HomePart5"> 
    <HomeHeader title={"Explore our products"} note={"our products"}  /> 

<div className="inner 
">
<div className="products-container-home2">

      <ProductCards products={products.splice(0,8)} />
</div>

      <RedButton text={"View all product"} btn_Function={navigatetoProduct}/>
</div>

    </div>
    

}
