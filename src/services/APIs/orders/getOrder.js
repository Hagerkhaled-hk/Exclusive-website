
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
import {  ReToken } from "../commonFunctions/TokenFunction.js";
export default async function GetAnOrder(intialData,Token)
{

    let url= import.meta.env.VITE__ORDERS_API +`/${intialData}`;
    console.log("getAnorder", url);
    

     let res =await FetchApi_Function(url,{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`},
     intialData

     );

     
              
               if(res.statusCode===401){
                    
          let retoken= await ReToken();
          if (!retoken) return [];
          
          res =await  FetchApi_Function(import.meta.env.VITE_UPDATE_QUNTITY_CART_API,
               {"Content-Type":"application/json",
          'Authorization': `Bearer ${Token}`}
          ,intialData
          );
     
               }
     
     
     return res;
}



