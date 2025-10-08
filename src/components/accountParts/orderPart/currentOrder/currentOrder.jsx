import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../../../context/orderContext/orderContext";
import OrderCurrentTable from "../../../../Common/orderCurrentTable/orderCurrentTable";

export default function CurrentOrder() {

  const { id } = useParams();
  const{get_order,currentOrder}=useContext(OrderContext);
const navigate = useNavigate();


async function Get_order() {
await get_order(id);
}


  return (
 <OrderCurrentTable  Get_order={Get_order}  currentOrder={currentOrder}  id={id} />
  );
}