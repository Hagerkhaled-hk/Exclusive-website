
import FetchApi_Function from "./commonFunctions/fetchFunction.js";
export default async function CategId(id)
{
     let res =await FetchApi_Function(`${import.meta.env.VITE_CATEGORY_ID_API}/${id}`,{"Content-Type":"application/json"} );
     return res;
}

