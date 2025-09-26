import { useContext, useEffect, useState } from "react";
import "./allOrders.css";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import LoadingModal from "../../../../Common/modal/modal";
import NoOrdersModal from "../../../noOrdersModal/noOrdersModal";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { OrderContext } from "../../../../context/orderContext/orderContext";
export default function AllOrders() {
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState(
    { selectedOrderId: "", actionType: "", id: null, show: false });
  const {View_Orders,Delete_Order,Cancel_Order,orders,totalPages,pageSize,page,setPage,set_Current_Order_index}=useContext(OrderContext);

    const handleChange = (event,value) => {
    setPage(value);
  }; 
  const navigate = useNavigate();
  

  const handleClose = (order) => { setModelInfo({ selectedOrderId: order, actionType: "", id: null, show: false }); };
  const handleShow = (order, id, type) => { setModelInfo({ selectedOrderId: order, actionType: type, id: id, show: true }); };



  function getOrderIndex(index)
  {
    
    let last_Prev_Index=((page-1)*pageSize)+1;
    return (index+last_Prev_Index);

  }

  
    const getStatusClass = (status) => {
      switch (status) {
        case "Pending": return "status-pending";
        case "Shipped,": return "status-inprogress";
        case "Delivered": return "status-completed";
        case "Canceled": return "status-cancelled";
        default: return "";
      }
    };



    function navigte_to_current_order(id , order_id)  { 
      let index= getOrderIndex(id);
      set_Current_Order_index(index);
       navigate(`/account/order/${order_id}`); }

  useEffect(() => {
    View_Orders(filter);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [filter,page]);




  return (
    <div className="AllOrders">
      {orders.length ==0?
       
      <LoadingModal loading={loading} text="No orders found" />
      :
      <>  
      
          <Toaster position="top-center" reverseOrder={false} />
      <h2>All Orders</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an order to see more information.</small>
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
            <option value="Shipped"> Shipped</option>
            <option value="Delivered"> Delivered</option>
          </select>
        </div>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>


          {
          
          orders[0].id=="" ?
          <tr className="no-orders-tr ">

          <td colSpan={6}   >  <NoOrdersModal status={filter} /></td>

          </tr> 
      :
          
          orders.map((order, id) => (
            <tr   onClick={() => {navigte_to_current_order(id , order.id) }} key={id}  >
              <td >{getOrderIndex(id)}</td>
              <td   >{new Date(order.createdAt).toLocaleDateString()}</td>
              <td  >{(order.total ).toFixed(1)} EGP</td>
              <td>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td onClick={(e)=>e.stopPropagation()} >
                <Button
                  className="btn cancel-icon"
                  disabled={order.status !== "Pending"}
                  onClick={() => { handleShow(order.id, id, "cancel"); }}
                >
                  Cancel
                </Button>
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


  );
}