import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDashboard_Context } from "../../../context/productContext";
import ProductDiscountList from "../productDiscountList/productDiscountList";

export default function SelectDiscountProductEdit() {
  const { products } = useContext(ProductDashboard_Context);
  const navigate = useNavigate();
  const{id} = useParams()// State to store selected product IDs
function Next()
{
  navigate(`/dashboard/discounts/Applydiscounts/${id}`)
   
}

  function get_Selected_localstorage(selectDiscountProduct)
  {
   const editSelectedDiscount = localStorage.getItem("editSelectedDiscount");
   console.log("editSelectedDiscount",editSelectedDiscount);
   
   if(!editSelectedDiscount)return;
  let editSelectedDiscount_parsed= JSON.parse(editSelectedDiscount);

 editSelectedDiscount_parsed.forEach(productId => {
    const product = products.find(item => item.id === productId);
    
    if (product) {
      // Remove from localStorage first to prevent reprocessing
      localStorage.removeItem("editSelectedDiscount");
      selectDiscountProduct(product.id, product.categoryId);
    } 
  });

  }

  return (
    <ProductDiscountList  get_Selected_edit_localstorage={get_Selected_localstorage} Next={Next} 
    IsStateFunction={false}   localStorageKey="editSelectedProducts"
    />
  );
}