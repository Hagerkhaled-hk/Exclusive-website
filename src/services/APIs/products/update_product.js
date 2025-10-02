
import UpdateAPi_Function from "../commonFunctions/updateFuntion.js";

export default async function UpdateProduct(intialData,id)
{
     
console.log(`${import.meta.env.VITE_PRODUCT_BY_ID_API}/${id}`);

     let res =await UpdateAPi_Function(`${import.meta.env.VITE_PRODUCT_BY_ID_API}/${id}`,
          {"Content-Type":"multipart/form-data"}
     ,intialData
     );

         
         


     return res;
}

