
import CreateAPi_Function from "../commonFunctions/createFunction.js";
import {  ReToken } from "../commonFunctions/TokenFunction.js";
export default async function AddToOrder(intialData,Token)
{

console.log(intialData,Token);

     let res =await CreateAPi_Function(import.meta.env.VITE_PLACE_ORDER_API,{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`},
     intialData

     );

     
              
               if(res.statusCode===401){
                    
          let retoken= await ReToken();
          if (!retoken) return [];
          
          res =await  CreateAPi_Function(import.meta.env.VITE_UPDATE_QUNTITY_CART_API,
               {"Content-Type":"application/json",
          'Authorization': `Bearer ${Token}`}
          ,intialData
          );
     
               }
     
     
     return res;
}



