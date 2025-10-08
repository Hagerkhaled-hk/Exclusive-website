import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import OrderCurrentTable from "../../../Common/orderCurrentTable/orderCurrentTable";
import { OrderDashboardContext } from "../../context/orderDashboardContext";

export default function CurrentOrderAdmin() {

  const { id } = useParams();
  const{get_order,currentOrder}=useContext(OrderDashboardContext);


async function Get_order() {
 await get_order(id);
 console.log("admin");
 
}


  return (
 <OrderCurrentTable  Get_order={()=>{Get_order()}}  currentOrder={currentOrder}  id={id} />
  );
}