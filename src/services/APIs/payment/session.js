
import CreateAPi_Function from "../commonFunctions/createFunction";
export default async function CheckoutSession(intialData)
{
     

     let res =await CreateAPi_Function(import.meta.env.VITE_SESSION_API,   
          
{"Content-Type":"application/json"},intialData);


  
     
     return res;
}



