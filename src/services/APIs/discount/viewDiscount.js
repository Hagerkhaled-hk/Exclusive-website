
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function ViewDiscount()
{
     let res =await FetchApi_Function(import.meta.env.VITE_VIEW_DISCOUNT,{"Content-Type":"application/json"} );
     return res;
}

