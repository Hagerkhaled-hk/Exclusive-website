
import { useContext, useEffect, useState } from "react";
import "./viewProducts.css";
import { ProductDashboard_Context } from "../../../context/productContext";
import LoadingModal from "../../../../Common/modal/modal";
import { Button, Modal } from "react-bootstrap";
import Header from "../../../common/header/header";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function viewProducts()
{
const {products,Delete_product} =useContext(ProductDashboard_Context);
  const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState(  { selectedProductId: "",name:"" ,id: null, show: false });
  const navigate= useNavigate();

  const handleClose = (product_id) => { setModelInfo({ selectedProductId: product_id, name:"", id: null, show: false }); };
  const handleShow = (product_id,name ,id  ) => { 
    console.log(product_id,name ,id );
    
    setModelInfo({ selectedProductId: product_id,name:name, id: id, show: true }); };


  



  useEffect(() => {
    

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    return(
       <div className="viewProducts DashboardPage">
          {products.length ==0?
           
          <LoadingModal loading={loading} text="No products found" />
          :
          <>  
                    <Toaster position="top-center" reverseOrder={false} />

              <h2 >All products</h2>
                <p style={{marginTop:"0px"  }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to Edit. </small></p>
       
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                  <th>Images</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
    
    
           
{              
              products.map((product, id) => (
                <tr   onClick={() => {   navigate(`/dashboard/product/${product.id}`); }} key={id}  >
                  <td data-label="ID: "  >{id+1}</td>
                  <td className="img-table" >
                    <div className="images">
<div className="img-container">{product.images.map((image,id)=><img  id={id} src={image} alt="" />)}</div>
                    </div>
                     </td>
                  <td  data-label="Name: " >{product.name}</td>
                  <td data-label="Category: " >{product.categoryName}</td>
                  <td data-label="Stock: " >{product.stock}</td>
                  <td data-label="Price:  " >{product.price}</td>
                
                  <td onClick={(e)=>e.stopPropagation()}>
                    <Button
                      className="btn cancel-icon"
                      variant="danger"
                      onClick={() => { 
                       handleShow(id,product.name, product.id); }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <Modal show={modelINfo.show} onHide={() => { handleClose(null); }}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontSize: "22px" }}>{modelINfo.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "12px" }}>
                  Do u want to delete <span style={{ fontWeight: "bold" }}>  {modelINfo.name} </span>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ fontSize: "10px" }} variant="danger" onClick={() => {
                 
                  Delete_product(modelINfo.id , modelINfo.name)
                    handleClose(modelINfo.selectedProductId );
                  }}>
                    Delete 
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
