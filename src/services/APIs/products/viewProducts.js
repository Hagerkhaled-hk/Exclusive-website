
import {  archiveProductsFilteration } from "../commonFunctions/archiveFilteration.js";
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
export default async function ViewProducts(isUser=true)
{
     let res =await FetchApi_Function(import.meta.env.VITE_VIEW_PRODUCTS_API,{"Content-Type":"application/json"} );

     if(res.statusCode==200 )res.data=archiveProductsFilteration(res.data,isUser);
     
     return res;
}

