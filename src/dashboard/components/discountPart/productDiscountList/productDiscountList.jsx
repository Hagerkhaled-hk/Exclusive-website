import { useContext, useEffect, useState } from "react";
import ProductSelectList from "../../../common/productSelectList/productSelectList";

export default function ProductDiscountList({Next,get_Selected_localstorage,IsStateFunction=true}) {
 const [selectedProducts, setSelectedProducts] = useState([]); 

 const selectDiscountProduct = (productId,categoryID) => {
  setSelectedProducts(prev => {
    console.log('prev',prev);
    
   if (prev.find((item)=>item.productId==productId) ) {
    // If already selected, remove it
    console.log("removee");

    
    return prev.filter(item => item.productId !== productId);
   } else {
    // If not selected, add it
    return [...prev, {"productId":productId,"categoryID":categoryID}];
   }
  });
 };




 function Get_LocalStorage_Data()
 {
  
  IsStateFunction ? 
  get_Selected_localstorage((data)=>{setSelectedProducts(data)})
  :get_Selected_localstorage((prodId,categID)=>{selectDiscountProduct(prodId,categID)})
    
 }


 useEffect(()=>{
  
     localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts));
 },[selectedProducts])

 return (
<ProductSelectList  selectedProducts={selectedProducts} selectDiscountProduct={selectDiscountProduct} Next={Next} Get_LocalStorage_Data={Get_LocalStorage_Data}/>
 );
}