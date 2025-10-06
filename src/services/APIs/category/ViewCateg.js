
import { archiveCategoryFilteration } from "../commonFunctions/archiveFilteration.js";
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function Viewateg(isUser=true)
{
     let res =await FetchApi_Function(import.meta.env.VITE_CATEGORY_API,{"Content-Type":"application/json"} );
      if(res.statusCode==200&&isUser)res.data=archiveCategoryFilteration(res.data);
          console.log(res.data,"res.data");
     return res;
}

