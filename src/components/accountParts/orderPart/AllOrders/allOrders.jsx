import { useContext, useEffect, useState } from "react";
import "./allOrders.css";
import viewOrders from "../../../../services/APIs/orders/viewOrders";
import { UserContext } from "../../../../context/userContext/userContext";
import toast, { Toaster } from "react-hot-toast";
import CancelOrder from "../../../../services/APIs/orders/cancelOrder";
import { Button, Modal, Spinner } from "react-bootstrap";
import DeleteOrder from "../../../../services/APIs/orders/deleteOrder";
import { Link, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import LoadingModal from "../../../../Common/modal/modal";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { getToken } = useContext(UserContext);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState({ selectedOrderId: "", actionType: "", id: null, show: false });
  const navigate = useNavigate();

  const handleClose = (order) => { setModelInfo({ selectedOrderId: order, actionType: "", id: null, show: false }); };
  const handleShow = (order, id, type) => { setModelInfo({ selectedOrderId: order, actionType: type, id: id, show: true }); };

  async function View_Orders(status = "all") {
    let token = getToken();
    if (!token) return;
    let apiStatus = status === "all" ? "" : status;    
      let res = await viewOrders(token, { PageNumber: 1, Status: apiStatus });
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

        setOrders(res?.data?.items || []);
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

  useEffect(() => {
    View_Orders(filter);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [filter]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "status-pending";
      case "Shipped,": return "status-inprogress";
      case "Delivered": return "status-completed";
      case "Canceled": return "status-cancelled";
      default: return "";
    }
  };

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
          {orders.map((order, id) => (
            <tr >
              <td>{id + 1}</td>
              <td onClick={() => { navigate(`/account/order/${id + 1}/${order.id}`); }} key={order.id}>{new Date(order.createdAt).toLocaleDateString()}</td>

              <td>{(order.total ).toFixed(1)} EGP</td>
              <td>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <Button
                  className="btn cancel-icon"
                  disabled={order.status !== "Pending"}
                  onClick={() => { handleShow(order.id, id, "cancel"); }}
                >
                  Cancel
                </Button>
              </td>
              <td>
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
    </div>


  );
}