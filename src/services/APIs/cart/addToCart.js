
import CreateAPi_Function from "../commonFunctions/createFunction.js";
import { ReToken } from "../commonFunctions/TokenFunction.js";
export default async function AddTOCart(intialData,Token)
{
     

     let res =await CreateAPi_Function(import.meta.env.VITE_ADD_TO_CART_API,{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`},
     intialData);

     console.log("AddToCart Api",res);
     
      if(res.statusCode===401){

          console.log("viewCart Retoken");
          
let retoken= await ReToken();
if (!retoken) return [];

res =await CreateAPi_Function(import.meta.env.VITE_ADD_TO_CART_API,{"Content-Type":"application/json",
     'Authorization': `Bearer ${retoken}`},
     intialData);
     
}

     return res;
}



