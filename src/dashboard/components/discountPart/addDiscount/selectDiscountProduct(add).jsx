import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductSelectList from "../../../common/productSelectList/productSelectList";
import ProductDiscountList from "../productDiscountList/productDiscountList";

export default function SelectDiscountProductAdd() {
  const navigate = useNavigate();
function Next()
{ navigate("/dashboard/discounts/Applydiscounts");
}

  return (
    <ProductDiscountList   Next={Next}
        IsStateFunction={true}

    />
  );
}