import { useContext, useEffect, useState } from "react";
 import "../orderPart/currentOrder/currentOrder.css"
 import { useNavigate } from "react-router-dom";
import ViewDiscount from "../../../services/APIs/discount/viewDiscount";
import LoadingModal from "../../../Common/modal/modal";
import DiscountCategory from "./discountCategory";

export default function DiscountPart() {
const [discount,setDiscount]=useState([]);
const [loading,setLoading]=useState(true);
const navigate =useNavigate();

function GoToProducts(code,ProductsId)
{
  localStorage.setItem("discountData",JSON.stringify({"code":code,"IDs":ProductsId}));
console.log("okay");

   navigate("/account/discountProducts");

}



useEffect(()=>{
(

    async ()=>{

        let res =await ViewDiscount();
        console.log(res.data);
        if(res.statusCode==200) setDiscount([...res.data]);
        

    }
)()

setTimeout(()=>{
    setLoading(false)
},2000)

},[])

  return (
    <div className="currentOrder-container" style={{width:"100%"}}>

{
      discount.length ==0?
      
    <LoadingModal loading={loading} text={"order"} />
    :
      <>
  <h2>Discount Codes</h2>

     
       <section>
      <table className="order-table" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categories</th>
            <th>startDate</th>
            <th>Value</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {discount.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No discounts found.
              </td>
            </tr>
          ) : (
            discount?.map((item, idx) => (

              <tr  onClick={()=>{GoToProducts(item.code,item.guidProductIds)}} id={idx}>
                <td data-label="ID:">{idx+1}</td>
                <td data-label="Category: "><DiscountCategory IDs={item.guidCategoryIds}/> </td>
                
                <td data-label="Start Date:">{ new Date(item.endDate).toLocaleDateString() } </td> 
                <td data-label="Value:">{item.value} {item.type} </td>
             <td data-label="Code:">{item.code}</td>
                
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