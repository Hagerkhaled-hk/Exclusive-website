
import { archiveCategoryFilteration } from "../commonFunctions/archiveFilteration.js";
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function CategId(id,filterCategAsAdmin=false,filterNames=true)
{
     let res =await FetchApi_Function(`${import.meta.env.VITE_CATEGORY_ID_API}/${id}`,{"Content-Type":"application/json"} );
     console.log(res);
     
     if(res.statusCode==200&&filterNames)res.data=archiveCategoryFilteration(res.data,filterCategAsAdmin); 
     return res;
}

