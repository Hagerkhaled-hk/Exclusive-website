import { useContext, useEffect, useState } from "react";
 import "../orderPart/currentOrder/currentOrder.css"
import ProductById from "../../../services/APIs/products/get_Product_Id";
import LoadingModal from "../../../Common/modal/modal";
import { useNavigate } from "react-router-dom";

export default function DiscountProducts() {
const [data,setData]=useState([]);
const[code,setCode]=useState(1);
const [loading,setLoading]=useState(true);
const navigate=useNavigate();





useEffect(()=>{

    const discountDataStorage = localStorage.getItem("discountData");
    if(!discountDataStorage) return;

const parsingData= JSON.parse(discountDataStorage);   
console.log(parsingData?.code);
setCode(parsingData?.code);
 
  ( 
     async ()=>{

        const productData = await Promise.all(
          parsingData.IDs.map(async(id)=>{
       let res =await ProductById(id);
   
    if(res.statusCode==200) return {"name":res.data.name,"category":res.data.categoryName ,"id":res.data.id};

})

)

setData(productData);

        

    }
)()

setTimeout(()=>{
    setLoading(false)
},2000)

},[])




  return (
    <div className="currentOrder-container" style={{width:"100%"}}>



{
      data.length ==0?
      
    <LoadingModal loading={loading} text={"Discounts"} />
    :
      <>
  <h2>Discount Code: <span style={{  color: "var(--red-color)" }}>{code}
    </span> </h2>
        <small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to see more information.</small>

     
       <section>
      <table className="order-table" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>product Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No discounts found.
              </td>
            </tr>
          ) : (
            data?.map((item, idx) => (

              <tr onClick={()=>{navigate(`/product/${item.id}`)}} id={idx}>
                <td data-label="ID:">{idx+1}</td>
                <td data-label="Product:">{item.name} </td>
                
                <td data-label="Category:">{ item.category } </td> 
                
              </tr>
            ))
          )}
        </tbody>
      </table>

</section>

      </>
}
    </div>



  );
}