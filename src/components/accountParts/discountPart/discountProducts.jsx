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
   
    if(res.statusCode==200) return {"name":res.data.name,"id":res.data.id};

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
      
    <LoadingModal loading={loading} text={"order"} />
    :
      <>
  <h2>Code {code}</h2>

     
       <section style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column" , marginTop:"70px"}}>
     
{data.map((item,index)=>{
    return <p className="discountProduct" style={{cursor:"pointer"}}  onClick={()=>{navigate(`/product/${item.id}`)}}  key={index}>{item.name}</p>

})}
</section>

      </>
}


    </div>
  );
}