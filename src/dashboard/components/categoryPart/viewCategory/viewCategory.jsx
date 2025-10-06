
import { useContext, useEffect, useState } from "react";
import LoadingModal from "../../../../Common/modal/modal";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RedButton from "../../../../Common/redButton/redButton";
import { CategoryDashboard_Context } from "../../../context/categoryContext";
import "../../productParts/viewProducts/viewProducts.css"

export default function ViewCategories()
{
 const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState(  { selectedCategoryId: "",name:"",description:"" ,id: null, show: false });
  const navigate= useNavigate();
const {categories,getCategories,Delete_category}=useContext(CategoryDashboard_Context);

  const handleClose = (category_id) => { setModelInfo({ selectedCategoryId: category_id, name:"", id: null,description:"", show: false }); };
  const handleShow = (category_id,name,description ,id  ) => { 
    console.log(category_id,name ,id );
    
    setModelInfo({ selectedProductId: category_id,name:name, id: id,description:description, show: true }); };

  


  useEffect(() => {
   getCategories();

   setTimeout(()=>{
    setLoading(false);
   },5000)
  }, []);

    return(
       <div className="viewProducts viewCategories DashboardPage">
          {categories?.length ==0?
           
          <LoadingModal loading={loading} mainText="No Categories found" />
          :
          <>  
                    <Toaster position="top-center" reverseOrder={false} />

              <h2 >Categories</h2>
              
                <p style={{marginTop:"0px"  }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an category to Edit. </small></p>
<RedButton text={"Add category"}  btn_Function={()=>{navigate("/dashboard/addcategory")}}/>


          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
    
    
           
{         


              categories?.map((category, id) => (
                <tr   onClick={() => {   navigate(`/dashboard/category/${category.id}`); }} key={id}  >
                  <td data-label="ID: "  >{id+1}</td>
                 
                  <td  data-label="Name: " >{category.name.split("##ARCHIVE")[0]}</td>
                  <td data-label="description: "  style={{overflowY:"auto" , overflowX:"hidden"}}>
                    <p >
   {category.description}
                    </p>
                 </td>
                  <td data-label="Created At" >{new Date(category.createdAt).toLocaleDateString()}</td>
                
                  <td onClick={(e)=>e.stopPropagation()}>
                    <Button
                      className="btn cancel-icon"
                      variant={`${category.name.includes("##ARCHIVE")?"primary":"danger"}`}
                      onClick={() => { 
                       handleShow(id,category.name,category.description, category.id); }}
                    >
                      {
                        category.name.includes("##ARCHIVE") ? 
                        "Restore":
                        "Archive"

                      }
                    </Button>
                  </td>
                </tr>
              ))}
              <Modal show={modelINfo.show} onHide={() => { handleClose(null); }}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontSize: "22px" }}>{modelINfo.name.split("##ARCHIVE")[0]} </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "12px" }}>
                  Do u want to {
                        modelINfo.name.includes("##ARCHIVE") ? 
                        "Restore":
                        "Archive"

                      } <span style={{ fontWeight: "bold" }}>  {modelINfo.name.split("##ARCHIVE")[0]} </span>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ fontSize: "10px" }} variant="danger" onClick={() => {
                 
                  Delete_category(modelINfo.id , modelINfo.name,modelINfo.description)
                    handleClose(modelINfo.selectedcategoryId );
                  }}>
                    {
                        modelINfo.name.includes("##ARCHIVE") ? 
                        "Restore":
                        "Archive"

                      }
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
