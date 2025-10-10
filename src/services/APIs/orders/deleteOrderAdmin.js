
import DeleteAPi_Function from "../commonFunctions/deleteFunction.js";
import {  ReToken } from "../commonFunctions/TokenFunction.js";
export default async function DeleteOrderAdmin(intialData,Token)
{
console.log("intialData",Token);

    let url= import.meta.env.VITE_Delete_ORDERS_ADMIN_API +`/${intialData}`;

     let res =await DeleteAPi_Function(url,{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`},
     );

     
              
          /*      if(res.statusCode===401){
                    
          let retoken= await ReToken(true);
          if (!retoken) return [];
          
          res =await DeleteAPi_Function(url,{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`},
     );
     
               } */
     
     
     return res;
}



