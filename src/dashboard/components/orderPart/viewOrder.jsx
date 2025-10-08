import { useContext, useEffect, useState } from "react";
import "../../../components/accountParts/orderPart/AllOrders/allOrders.css";
import "../../../pages/account/account.css";
import "../productParts/viewProducts/viewProducts.css"
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import LoadingModal from "../../../Common/modal/modal";
import NoOrdersModal from "../../../components/noOrdersModal/noOrdersModal";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import viewAdminOrders from "../../../services/APIs/orders/viewAdminorders";
import { DashboardContext } from "../../context/dashboardContext";
import RedButton from "../../../Common/redButton/redButton";
import { OrderContext } from "../../../context/orderContext/orderContext";
import CustomSelectStatus from "../customSelectStatus/customSelect";
export default function ViewOrdersAdmin() {
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState(
    { selectedOrderId: "", actionType: "", id: null, show: false });
 

    const handleChange = (event,value) => {
    setPage(value);
  }; 
  const navigate = useNavigate();
  const [totalPages,setTotalPages]=useState(10);
  const [ page,setPage]=useState(1);
   const pageSize=10;
  const[orders,setOrders]=useState([]);
  const {getAdminToken}=useContext(DashboardContext);
  const {toCurrentOrder}=useContext(OrderContext);
  const handleClose = (order) => { setModelInfo({ selectedOrderId: order, actionType: "", id: null, show: false }); };
  const handleShow = (order, id, type) => { setModelInfo({ selectedOrderId: order, actionType: type, id: id, show: true }); };

  const [selectedStatus, setSelectedStatus] = useState('pending');
 
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  function getOrderIndex(index)
  {
    
    let last_Prev_Index=((page-1)*pageSize)+1;
    return (index+last_Prev_Index);

  }

  



     async function View_AdminOrders(status="all") {
        
        let token = getAdminToken();
        console.log(token);
        
        if (!token) return;
        let apiStatus = status === "all" ? "" : status;    
        
          let res = await viewAdminOrders(token, { "PageNumber": page, "Status": apiStatus ,"PageSize":pageSize });
          console.log(res);
          
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
  useEffect(() => {
    
    View_AdminOrders(filter);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [filter,page]);




  return (
    <div className="viewProducts">
    <div className="AllOrders  ">
      {orders.length ==0?
       
      <LoadingModal loading={loading} text="No orders found" />
      :
      <>  
      
          <Toaster position="top-center" reverseOrder={false} />
      <h2>All Orders</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <div className="left">
  <p>      <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an order to see more information.</small></p>
  <RedButton text={"Add order"}  btn_Function={()=>{navigate("/dashboard/addproduct")}}/>
        

        </div>
        <div className="filter-select">
          <CiFilter />
          <select
            className="custom-filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="shipped"> Shipped</option>
            <option value="delivered"> Delivered</option>
          </select>
        </div>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Buyer</th>
            <th>Created At</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>


          {
          
          orders[0].id=="" ?
          <tr className="no-orders-tr ">

          <td colSpan={6}>  <NoOrdersModal status={filter}  admin={true}/></td>

          </tr> 
      :
          
          orders.map((order, id) => (
            <tr   onClick={() => {   
               navigate(`/dashboard/order/${order.id}`)
}} key={id}  >
              <td data-label="ID: "  >{getOrderIndex(id)}</td>
              <td data-label="Buyer: "  >{order.buyerName}</td>
              <td  data-label="Start Date: " >{new Date(order.createdAt).toLocaleDateString()}</td>
              <td data-label="Total: " >{(order.total ).toFixed(1)} EGP</td>
              <div className="row">
                     <td onClick={(e)=>{e.stopPropagation()}}>
            

                <CustomSelectStatus onChange={handleStatusChange} value={order.status} />
              </td>
           
              <td onClick={(e)=>e.stopPropagation()}>
                <Button
                  className="btn cancel-icon"
                  variant="danger"
                  disabled={order.status!="Canceled"}
                  onClick={() => { handleShow(order.id, id, "delete"); }}
                >
                  Delete
                </Button>
              </td>
              </div>
              <td onClick={(e)=>{e.stopPropagation()}}>
            

                <CustomSelectStatus onChange={handleStatusChange} value={order.status} />
              </td>
           
              <td onClick={(e)=>e.stopPropagation()}>
                <Button
                  className="btn cancel-icon"
                  variant="danger"
                  disabled={order.status!="Canceled"}
                  onClick={() => { handleShow(order.id, id, "delete"); }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <Modal show={modelINfo.show} onHide={() => { handleClose(null); }}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "22px" }}> Order {modelINfo.id + 1} </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "12px" }}>
              Do u want to {modelINfo.actionType} <span style={{ fontWeight: "bold" }}> Order {modelINfo.id + 1} </span>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ fontSize: "10px" }} variant="danger" onClick={() => {
                modelINfo.actionType == "delete"
                  ? Delete_Order(modelINfo.selectedOrderId ? modelINfo.selectedOrderId : null)
                  : Cancel_Order(modelINfo.selectedOrderId ? modelINfo.selectedOrderId : null);
                handleClose(modelINfo.selectedOrderId ? modelINfo.selectedOrderId : null);
              }}>
                {modelINfo.actionType} Order
              </Button>
            </Modal.Footer>
          </Modal>
        </tbody>
      </table>
      </>
            }
         <Stack spacing={2} style={{display:"flex" ,justifyContent:"center" ,alignItems:"center", marginTop:"20px" }}>
<Pagination count={totalPages}   onChange={handleChange}  />
     </Stack>
    </div>
    </div>


  );
}