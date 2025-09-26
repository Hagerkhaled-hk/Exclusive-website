import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../userContext/userContext";
import viewOrders from "../../services/APIs/orders/viewOrders";
import GetAnOrder from "../../services/APIs/orders/getOrder";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {

      const [orders, setOrders] = useState([]);
  const { getToken } = useContext(UserContext);
  const [totalPages,setTotalPages]=useState(1);
    const [page,setPage]=useState(1);
  const pageSize=10;

  const [current_Order_index,set_Current_Order_index]=useState(0);
    const [currentOrder, setCurrentOrder] = useState({});




  async function View_Orders(status = "all") {
    
    let token = getToken();
    console.log(token);
    
    if (!token) return;
    let apiStatus = status === "all" ? "" : status;    
    
      let res = await viewOrders(token, { "PageNumber": page, "Status": apiStatus ,"PageSize":pageSize });
      
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
    let token = getToken();
    if (!token) return;
    let res = await CancelOrder(id, token);
    if (res.succeeded) { toast.success("Order Cancelled"); View_Orders(filter); }
    else toast.error(res?.message || "Error Occured");
  }

  async function Delete_Order(id) {
    let token = getToken();
    if (!token) return;
    let res = await DeleteOrder(id, token);
    if (res.succeeded) { toast.success("Order Deleted"); View_Orders(filter); }
    else toast.error(res?.message || "Error Occured");
  }




 async function  getIndexOfOrder (id) {

    let index=-1;
    let pageNumber =0 ;
    let pageSize=100;
    let token =getToken();
      while(index==-1){
                 pageNumber++;

          let res = await viewOrders(token, { "PageNumber": pageNumber, "Status": "" ,"PageSize":pageSize });
 console.log(res);
 
          let orderArray = res?.data?.items;
          console.log("araay", orderArray);
          
         index=orderArray.findIndex((item)=>item.id==id);
         console.log("index" , index);
         console.log("pageNumber" , pageNumber);
         
      }
  let orderIndex= ((pageNumber-1)*pageSize)+index+1; 

set_Current_Order_index(orderIndex);    
  }

  
  async function get_order(id) {
    let token = getToken();
    if (!token) return;
    let res = await GetAnOrder(id, token);
    setCurrentOrder(res?.data || {});

  }


  return (
    <OrderContext.Provider value={{View_Orders,Delete_Order,Cancel_Order,orders,totalPages,pageSize,setPage,page,set_Current_Order_index,
    
    current_Order_index,get_order,currentOrder,current_Order_index,getIndexOfOrder}}>
      {children}
    </OrderContext.Provider>
  );
}