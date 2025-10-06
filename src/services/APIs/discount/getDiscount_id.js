
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function getDiscountId(id)
{
     let res =await FetchApi_Function(`${import.meta.env.VITE_DISCOUNT_API}/${id}`,{"Content-Type":"application/json"} );
     return res;
}

