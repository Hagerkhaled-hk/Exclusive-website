
import { archiveCategoryFilteration } from "../commonFunctions/archiveFilteration.js";
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function Viewateg(filterCategAsAdmin=false,filterNames=true)
{
     let res =await FetchApi_Function(import.meta.env.VITE_CATEGORY_API,{"Content-Type":"application/json"} );
      if(res.statusCode==200&&filterNames)res.data=archiveCategoryFilteration(res.data,filterCategAsAdmin);
          console.log(res.data,"res.data");
     return res;
}

