import { createContext, useEffect, useState } from "react";
import ViewProducts from "../../services/APIs/products/viewProducts";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products,setProducts] =  useState([]);

  useEffect(()=>{
(async()=>{

let res = await ViewProducts();
setProducts(res.data)


})()





  },[])

 




  return (
    <ProductContext.Provider value={{products ,setProducts}}>
      {children}
    </ProductContext.Provider>
  );
}