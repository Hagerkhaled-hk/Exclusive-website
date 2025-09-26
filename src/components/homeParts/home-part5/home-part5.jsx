import { useEffect, useState } from "react";
import ViewProducts from "../../../services/APIs/products/viewProducts";
import ProductCards from "../../ProductCards/ProductCards";
import HomeHeader from "../../../Common/homeHeader/homeHeader";
import RedButton from "../../../Common/redButton/redButton";
import { useNavigate } from "react-router-dom";

import "./HomePart5.css"
import LoadingModal from "../../../Common/modal/modal";
export default function HomePart5()
{

   const [products,setProducts] =  useState([]); 
   let navigate =useNavigate();
   const[loading,setLoading]=useState(true);
   function navigatetoProduct()
   {
navigate("/product")
   }


   useEffect(()=>{
     
 
(async()=>{

       let res= await  ViewProducts();
  setProducts(res.data);
})()    


setTimeout(()=>{
   setLoading(false)
},5000)
   },[])


   
    return <div  className="HomePart5"> 
    <HomeHeader title={"Explore our products"} note={"our products"}  /> 

<div className="inner 
">
 <div className="products-container-home2">
{
products.length ? <ProductCards products={products.splice(0,8)} />:

<LoadingModal loading={loading}/>
}
</div> 

      <RedButton text={"View all product"} btn_Function={navigatetoProduct}/>
</div>

    </div>
    

}
