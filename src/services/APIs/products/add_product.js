
import CreateAPi_Function from "../commonFunctions/createFunction.js";
export default async function Add_Product(intialData)
{

     let res =await CreateAPi_Function(import.meta.env.VITE_ADD_PRODUCT_API,{ 'Accept': 'application/json' },
     intialData , false

     );

     
        
     return res;
}



