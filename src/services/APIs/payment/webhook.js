
import CreateAPi_Function from "../commonFunctions/createFunction";
export default async function WebHook()
{
     

     let res =await CreateAPi_Function(import.meta.env.VITE_WEBHOOK_API,   
          
{"Content-Type":"application/json"
});


  
     
     return res;
}



