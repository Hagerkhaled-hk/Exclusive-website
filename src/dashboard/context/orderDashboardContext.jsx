import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { DashboardContext } from "./dashboardContext";
import viewAdminOrders from "../../services/APIs/orders/viewAdminorders";
import GetAnOrderAdmin from "../../services/APIs/orders/GetanOrderAdmin";

export const OrderDashboardContext = createContext();

export default function OrderDashboardProvider({ children }) {

      const [orders, setOrders] = useState([]);
  const { getAdminToken } = useContext(DashboardContext);
  const [totalPages,setTotalPages]=useState(1);
    const [page,setPage]=useState(1);
  const pageSize=10;
    const [currentOrder, setCurrentOrder] = useState({});
   




  async function View_Orders(status = "all") {
    
    let token = getAdminToken();
    
    if (!token) return;
    let apiStatus = status === "all" ? "" : status;    
    
      let res = await viewAdminOrders(token, { "PageNumber": page, "Status": apiStatus ,"PageSize":pageSize });
      
      if(res.statusCode==200 && res?.data?.items?.length==0 ){
        
        setOrders([ {
        "id": "",
        "buyerName": "",
        "createdAt": "",
        "status": "",
        "total":0
      }]);}
      else {
let data = res?.data;
        setOrders(data?.items || []);
        setTotalPages(data?.totalPages);
        console.log("data", data?.totalPages);
        
      }

      
      
  }



  async function Cancel_Order(id) {
    let token = getAdminToken();
    if (!token) return;
    let res = await CancelOrder(id, token);
    if (res.succeeded) { toast.success("Order Cancelled"); View_Orders(); }
    else toast.error(res?.message || "Error Occured");
  }

  async function Delete_Order(id) {
    let token = getAdminToken();
    if (!token) return;
    let res = await DeleteOrder(id, token);
    if (res.succeeded) { toast.success("Order Deleted"); View_Orders(); }
    else toast.error(res?.message || "Error Occured");
  }
 




  
  async function get_order(id) {
    let token="";
     token = getAdminToken();
     console.log("token",token);
     
    if (!token) return;
   let  res = await GetAnOrderAdmin(id, token);
   console.log(res);
   
         setCurrentOrder(res?.data || {count:0});
  }


  return (
    <OrderDashboardContext.Provider value={{View_Orders,Delete_Order,Cancel_Order,orders,totalPages,pageSize,setPage,page,get_order,currentOrder}}>
      {children}
    </OrderDashboardContext.Provider>
  );
}