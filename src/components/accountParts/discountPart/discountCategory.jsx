import { useContext, useEffect, useState } from "react";
import CategId from "../../../services/APIs/category/categ_id";

export default function DiscountCategory({IDs=[]}) {
const [names,setNames]=useState([]);

async function getIdCateg(id) {
  
  let res = await CategId(id);
  console.log(res);
  return  res;
  
}



useEffect(()=>{
(

    async ()=>{

        const names= await Promise.all(
            IDs.map( async(id)=>{

                let res =await getIdCateg(id);
                console.log(res.data);
                if(res.statusCode==200) return res?.data?.name;
            })
        )
console.log(names);

        setNames(names);
        

    }
)()

setTimeout(()=>{
    setLoading(false)
},2000)

},[])

  return (
    <div className="DiscountCategory">

{
   names.map((name ,id)=>{

return <p>{name}</p>
   })

}
    </div>
  );
}