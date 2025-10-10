import { useContext, useEffect, useState } from "react";
import ProductSelectList from "../../../common/productSelectList/productSelectList";

export default function ProductDiscountList({Next,get_Selected_edit_localstorage=()=>{;
},IsStateFunction=true, localStorageKey=""}) {
 const [selectedProducts, setSelectedProducts] = useState([]); 

 const selectDiscountProduct = (productId,categoryID) => {
    
  setSelectedProducts(prev => {
    
   if (prev.find((item)=>item.productId==productId) ) {
    // If already selected, remove it

    
    return prev.filter(item => item.productId !== productId);
   } else {
    // If not selected, add it
    return [...prev, {"productId":productId,"categoryID":categoryID}];
   }
  });
 };

 function Get_LocalStorage_Data()
 {
    let isSelectedProduct_exists = localStorage.getItem(localStorageKey);     
    console.log("isSelectedProduct_exists",(!IsStateFunction || !isSelectedProduct_exists));
     
(!IsStateFunction && !isSelectedProduct_exists) ? 
get_Selected_edit_localstorage((prodId,categID)=>{selectDiscountProduct(prodId,categID)})
 : get_Selected_localstorage()
    
 }

 

  function get_Selected_localstorage()
  {
   let SelectedProducts_local = localStorage.getItem(localStorageKey);
   console.log(localStorageKey,"localStorageKey");
   console.log("SelectedProducts_local",SelectedProducts_local);
   
   
if(!SelectedProducts_local)return;
     SelectedProducts_local=JSON.parse(SelectedProducts_local);
     setSelectedProducts(SelectedProducts_local);
  }



  useEffect(()=>{

      localStorage.setItem(localStorageKey,JSON.stringify(selectedProducts));
  },[selectedProducts])
  
 
 
 


 return (
<ProductSelectList  selectedProducts={selectedProducts} selectDiscountProduct={selectDiscountProduct} Next={Next} Get_LocalStorage_Data={Get_LocalStorage_Data} setSelectedProducts={setSelectedProducts}
Title={`${IsStateFunction?"Add discount":"Edit Discount"}`}visibleQuantity={false}

/>
 );
}