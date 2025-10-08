
import UpdateAPi_Function from "../commonFunctions/updateFuntion.js";

import { ReToken  } from "../commonFunctions/TokenFunction.js";
export default async function ChangeStatusAdmin(intialData,id,Token)
{
     console.log(intialData);
     

    let url= import.meta.env.VITE__ORDERS_ADMIN_API +`/${id}/status`;
console.log(Token);
console.log(url);
    
     let res =await UpdateAPi_Function(url,
          {"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`}
     ,intialData
     );

         
          if(res.statusCode===401){
               
     let retoken= await ReToken(true);
     if (!retoken) return [];
     
     res =await  UpdateAPi_Function(url,
          {"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`}
     ,intialData
     );

          }


     return res;
}

