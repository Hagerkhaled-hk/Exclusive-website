
import FetchApi_Function from "./commonFunctions/fetchFunction.js";
export default async function Viewateg()
{
     let res =await FetchApi_Function(import.meta.env.VITE_CATEGORY_API,{"Content-Type":"application/json"} );
     return res;
}

