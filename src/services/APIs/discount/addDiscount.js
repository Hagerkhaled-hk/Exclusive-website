
import CreateAPi_Function from "../commonFunctions/createFunction.js";
export default async function Add_Disconut(intialData)
{

     let res =await CreateAPi_Function(import.meta.env.VITE_DISCOUNT_API,{"Content-Type":"application/json"} ,
     intialData 

     );

     
        
     return res;
}



