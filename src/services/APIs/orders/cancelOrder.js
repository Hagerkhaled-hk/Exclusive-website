
import UpdateAPi_Function from "../commonFunctions/updateFuntion.js";

import { ReToken  } from "../commonFunctions/TokenFunction.js";
export default async function CancelOrder(intialData,Token)
{

    let url= import.meta.env.VITE_CANCEL_ORDER_API +`/${intialData}/cancel`;
    
     let res =await UpdateAPi_Function(url,
          {"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`}
     ,intialData
     );

         
          if(res.statusCode===401){
               
     let retoken= await ReToken();
     if (!retoken) return [];
     
     res =await  UpdateAPi_Function(url,
          {"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`}
     ,intialData
     );

          }


     return res;
}

