
import CreateAPi_Function from "../commonFunctions/createFunction.js";
export default async function ApplyDiscount(intialData)
{

 
     let res =await CreateAPi_Function(import.meta.env.VITE_APPLY_DISCOUNT,{"Content-Type":"application/json"},
     intialData

     );

     return res;
}



