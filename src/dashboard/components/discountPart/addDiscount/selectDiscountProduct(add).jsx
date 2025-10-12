import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductSelectList from "../../../common/productSelectList/productSelectList";
import ProductDiscountList from "../productDiscountList/productDiscountList";
import { DashboardContext } from "../../../context/dashboardContext";

export default function SelectDiscountProductAdd() {
  const{demoDashboard}=useContext(DashboardContext);
  const navigate = useNavigate();
function Next()
{ navigate(`${demoDashboard?"/DemoDashboard":"/dashboard"}/discounts/Applydiscounts`);
}

  return (
    <ProductDiscountList   Next={Next}
        IsStateFunction={true}
        localStorageKey="addSelectedProducts"

    />
  );
}