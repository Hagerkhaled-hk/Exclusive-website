import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductSelectList from "../../../common/productSelectList/productSelectList";
import ProductDiscountList from "../productDiscountList/productDiscountList";

export default function SelectDiscountProductAdd() {
  const navigate = useNavigate();

 




function Next()
{
  
   
    navigate("/dashboard/discounts/Applydiscounts");
}


  function get_Selected_localstorage(setSelectedProducts)
  {
   let SelectedProducts_local = localStorage.getItem("selectedProducts");
   
if(!SelectedProducts_local)return;
     SelectedProducts_local=JSON.parse(SelectedProducts_local);
     setSelectedProducts(SelectedProducts_local);



  }






  return (
    <ProductDiscountList  get_Selected_localstorage={get_Selected_localstorage} Next={Next}
        IsStateFunction={true}

    />
  );
}