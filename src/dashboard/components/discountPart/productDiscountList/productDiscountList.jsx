import { useContext, useEffect, useState } from "react";
import ProductSelectList from "../../../common/productSelectList/productSelectList";

export default function ProductDiscountList({Next,get_Selected_edit_localstorage=()=>{},IsStateFunction=true}) {
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
    let isSelectedProduct_exists = localStorage.getItem("selectedProducts");      
  (IsStateFunction || isSelectedProduct_exists) ? 
  get_Selected_localstorage()
  :get_Selected_edit_localstorage((prodId,categID)=>{selectDiscountProduct(prodId,categID)})
    
 }

 

  function get_Selected_localstorage()
  {
   let SelectedProducts_local = localStorage.getItem("selectedProducts");
if(!SelectedProducts_local)return;
     SelectedProducts_local=JSON.parse(SelectedProducts_local);
     setSelectedProducts(SelectedProducts_local);
  }



  useEffect(()=>{

      localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts));
  },[selectedProducts])
  
 
 
 


 return (
<ProductSelectList  selectedProducts={selectedProducts} selectDiscountProduct={selectDiscountProduct} Next={Next} Get_LocalStorage_Data={Get_LocalStorage_Data} setSelectedProducts={setSelectedProducts}/>
 );
}