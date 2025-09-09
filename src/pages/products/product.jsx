import React, { useContext, useEffect, useState } from "react";
import ProductCards from "../../components/ProductCards/ProductCards";
import "./product.css";
import ViewProducts from "../../services/APIs/viewProducts";
 
export default function ProductsPage() {
  const [products,setProducts] =  useState([]); 
  useEffect(()=>{
    

    (async ()=>{
let res= await  ViewProducts();


setProducts(res.data);

    })()
  })
 
  return (
    <div>
      <h2>All Products</h2>

      <ProductCards products={products} />
    </div>
  );
}
