import React, { useContext, useEffect, useState } from "react";
import ProductCards from "../../components/ProductCards/ProductCards";
import "./product.css";
import ViewProducts from "../../services/APIs/products/viewProducts";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
 
export default function ProductsPage() {
  const [products,setProducts] =  useState([]); 
  useEffect(()=>{
    

    (async ()=>{
let res= await  ViewProducts();


setProducts(res.data);

    })()
  })
 
  return (
    <div className="ProductsPage">

<DynamicIndex page={["home","all products"]}/>


    <div className="products-container-ProductsPage ">

      <ProductCards products={products} />
      </div>
    </div>
  );
}
