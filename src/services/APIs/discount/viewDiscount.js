
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function ViewDiscount(activeOnly=false)
{
     
     let res =await FetchApi_Function(`${import.meta.env.VITE_VIEW_DISCOUNT}=${activeOnly}`,{"Content-Type":"application/json"} );
     return res;
}

