
import { useContext, useEffect, useState } from "react";
import "./viewProducts.css";
import { ProductDashboard_Context } from "../../../context/productContext";
import LoadingModal from "../../../../Common/modal/modal";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RedButton from "../../../../Common/redButton/redButton";
import Viewateg from "../../../../services/APIs/category/ViewCateg";
import { CiFilter } from "react-icons/ci";
import { DashboardContext } from "../../../context/dashboardContext";


export default function viewProducts()
{
  const{demoDashboard}=useContext(DashboardContext);
const {products,Delete_product} =useContext(ProductDashboard_Context);
  const [loading, setLoading] = useState(true);
  const [filter,setFilter]=useState([])
  const [modelINfo, setModelInfo] = useState(  { selectedProductId: "",name:"" ,id: null, show: false });
  const navigate= useNavigate();
const [categories,setCategories]=useState([]);
  const handleClose = (product_id) => { setModelInfo({ selectedProductId: product_id, name:"", id: null, show: false }); };
  const handleShow = (product_id,name ,id  ) => { 
    console.log(product_id,name ,id );
    
    setModelInfo({ selectedProductId: product_id,name:name, id: id, show: true }); };



    async function getCategories() {
          let res =await Viewateg(true);
          console.log(res);
          
          if(res.statusCode==200)setCategories(res?.data);
          else console.log(res.message);
                
    }
  
function handleChange(e)
{
  let category =e.target.value;
/*   console.log(category);
 */  
if(category=="All"){setFilter(products); return}

  let filterProducts = products.filter((product)=>product?.categoryName==category );
      if(filterProducts.length==0)setFilter([{count:0}]);
     else setFilter(filterProducts);

console.log(filterProducts);
 
 
}
useEffect(()=>{
     setFilter([...products]);

},[products])

  useEffect(() => {
   getCategories();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    return(
       <div className="viewProducts DashboardPage">
          {filter?.length ==0?
           
          <LoadingModal loading={loading} mainText="No products found" />
          : 
          <>  
                    <Toaster position="top-center" reverseOrder={false} />

              <h2 >Products</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <div className="left">
                <p style={{marginTop:"0px"  }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to Edit. </small></p>
<RedButton text={"Add product"}  btn_Function={()=>{navigate(`${demoDashboard?"/DemoDashboard":"/dashboard"}/addproduct`)}}/>

                </div>
  <div className="filter-select">
          <CiFilter />
          <select
            className="custom-filter-select"
            onChange={handleChange}
           
          >
            <option value={"none"}>All</option>
           {
            categories?.map((category, id)=><option value={category.name} id={id}>{category.name}</option>

            )
           }
          </select>
        </div>
              </div>
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

(filter?.length==1&&filter[0]?.count==0)?
<tr  >
<td colSpan={6} >
<LoadingModal loading={false} mainText="No Product Found in this categroy"/>

</td>
</tr>

:
              filter?.map((product, id) => (
                <tr   onClick={() => {   navigate(`${demoDashboard?"/DemoDashboard":"/dashboard"}/product/${product.id}`); }} key={id}  >
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
