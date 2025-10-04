
import DeleteAPi_Function from "../commonFunctions/deleteFunction.js";
export default async function DeleteDiscount(id)
{

     let res =await DeleteAPi_Function(`${import.meta.env.VITE_DISCOUNT_API}/${id}`,
          {"Content-Type":"application/json"}     );



     return res;
}

