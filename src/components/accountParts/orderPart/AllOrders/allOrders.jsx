import { use, useContext, useEffect, useState } from "react";
import "./allOrders.css";
import viewOrders from "../../../../services/APIs/orders/viewOrders";
import { UserContext } from "../../../../context/userContext/userContext";
import toast, { Toaster } from "react-hot-toast";
import CancelOrder from "../../../../services/APIs/orders/cancelOrder";
import AlertModal from "../../../../Common/modal/modal";
import { Button, Modal } from "react-bootstrap";

export default function AllOrders() {
const [orders,setOrders]=useState([]);

const [show, setShow] = useState(false);

const {getToken} =useContext(UserContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
async function View_Orders() {
    let token=getToken();
  if(!token)return;
let res =await viewOrders(getToken(token,{PageNumber:1,PageSize:10}));
console.log(res);
setOrders(res?.data?.items||[]);
}

async function Cancel_Order(id)
{
  console.log(id);
  
let token= getToken();
if(!token)return;

let res =await CancelOrder(id,token);

if(res.succeeded){toast.success("Order Cancelled"); View_Orders(); }
else toast.error("Error Occured");

}


useEffect(()=>{
View_Orders();

},[])

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In progress":
        return "status-inprogress";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="AllOrders">
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h2>All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Total</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order , id) => (
            <tr key={order.id}>
              <td>{id+1}</td>
              <td>{order.createdAt}</td>
              <td>{order.total} EGP</td>
              <td>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
              <Button         
                         className="cancel-btn"
                  disabled={order.status !== "Pending" }
                   onClick={handleShow}>
                                   Cancel
                                </Button>
            
   <Modal  show={show}   onHide={handleClose}>
  

        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:"22px"}}> Order {id+1} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize:"12px"}}>
          Do u want  to Cancel  <span style={{ fontWeight: "bold" }}> Order {id+1} </span>
        </Modal.Body>
        <Modal.Footer>

          <Button style={{fontSize:"10px"}} variant="danger" onClick={()=>{
            Cancel_Order(order.id); handleClose();}}>
            Cancel Order
          </Button>
        </Modal.Footer>
      </Modal>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}