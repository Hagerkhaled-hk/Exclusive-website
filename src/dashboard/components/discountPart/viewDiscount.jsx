
import { useContext, useEffect, useState } from "react";
import "../productParts/viewProducts/viewProducts.css";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import ViewDiscount from "../../../services/APIs/discount/viewDiscount";
import DeleteDiscount from "../../../services/APIs/discount/deleteDiscount";
import LoadingModal from "../../../Common/modal/modal";
import RedButton from "../../../Common/redButton/redButton";


export default function ViewDiscounts()
{
  const [loading, setLoading] = useState(true);
  const [modelINfo, setModelInfo] = useState(  { selectedOrdertId: "" ,id: null, show: false });
  const [activeOnly,setActiveOnly]=useState(false)
  const[discounts,setDiscounts]=useState([]);
  const navigate= useNavigate();
  const handleClose = (order_id) => { setModelInfo({ selectedOrdertId: order_id, id: null, show: false }); };
  const handleShow = (index ,id  ) => { 
    
    setModelInfo({ selectedOrdertId: index, id: id, show: true }); };


  async  function Delete_discount(id)
    {
        let res =await DeleteDiscount(id);
        if(res.statusCode!==200) toast.error(res.message||"Unable to delete discount");
        getDiscounts();

    }

    async function getDiscounts() {
          let res =await ViewDiscount(activeOnly);
          console.log(res);
          
          if(res.statusCode==200) {if(res?.data.length==0)setDiscounts([{count:0}]);
           else setDiscounts(res?.data);}
          else console.log(res.message);
                
    }


    function handleChange(e)
    {
setActiveOnly(e.target.value);
    }


    function editFunction(selectedProducts,id)
    {
      localStorage.removeItem("selectedProducts");

    localStorage.setItem("editSelectedDiscount",JSON.stringify(selectedProducts));


    navigate(`/dashboard/discounts/Applyproducts/${id}`); 
    }

    function addDiscountBtn()
    {
localStorage.removeItem("selectedProducts");
      navigate("Applyproducts")
    }

useEffect(()=>{
   getDiscounts();

},[activeOnly])

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    return(
       <div className="viewProducts DashboardPage">
          {discounts?.length ==0?
           
          <LoadingModal loading={loading} mainText="No products found" />
          :
          <>  
                    <Toaster position="top-center" reverseOrder={false} />

              <h2 >Discounts</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <div className="left">
                <p style={{marginTop:"0px"  }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to Edit. </small></p>
<RedButton text={"Add discount"}  btn_Function={()=>{addDiscountBtn()}}/>

                </div>
  <div className="filter-select">
          <CiFilter />
          <select
            className="custom-filter-select"
            onChange={handleChange}
           
          >
            <option  value={false}>All</option>
            <option  value={true}>Active only</option>
          </select>
        </div>
              </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                  <th>Code</th>
                <th>Type</th>
                <th>value</th>
                <th>startDate</th>
                <th>endDate</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
    
    
           
{         

(discounts?.length==1&&filter[0]?.count==0)?
<tr  >
<td colSpan={6} >
<LoadingModal loading={false} mainText="No Discount Found "/>

</td>
</tr>

:
              discounts?.map((discount, id) => (
                <tr   onClick={() => { editFunction(discount.guidProductIds,discount.id)  }} key={id}  >
                  <td data-label="ID: "  >{id+1}</td>
                  
                  <td  data-label="Code: " >{discount.code}</td>
                  <td data-label="Type: " >{discount.type}</td>
                  <td data-label="Value: " >{discount.value}</td>
                  <td data-label="Start Date:  " >{new Date(discount.startDate).toLocaleDateString()}</td>
                  <td data-label="End Date:  " >{new Date(discount.endDate).toLocaleDateString()}</td>
                  <td data-label="Active:  " >{discount.isActive?"yes":"no"}</td>
                
                  <td onClick={(e)=>e.stopPropagation()}>
                    <Button
                      className="btn cancel-icon"
                      variant="danger"
                      onClick={() => { 
                       handleShow(id, discount.id); }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <Modal show={modelINfo.show} onHide={() => { handleClose(null); }}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontSize: "22px" }}>Order {modelINfo.selectedOrdertId+1} </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "12px" }}>
                  Do u want to delete <span style={{ fontWeight: "bold" }}> order {modelINfo.selectedOrdertId} </span>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ fontSize: "10px" }} variant="danger" onClick={() => {
                 
                  Delete_discount(modelINfo.id , modelINfo.selectedOrdertId)
                    handleClose(modelINfo.selectedOrdertId );
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
