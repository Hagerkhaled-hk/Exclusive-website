
import FetchApi_Function from "../commonFunctions/fetchFunction.js";
import {  ReToken } from "../commonFunctions/TokenFunction.js";
export default async function viewOrders(Token,intialData)
{
     
if (!Token) return [];

let url = new URL(import.meta.env.VITE__ORDERS_API);
url.search= new URLSearchParams(intialData).toString();

     let res =await FetchApi_Function(url,             
     
{"Content-Type":"application/json",
     'Authorization': `Bearer ${Token}`,intialData});

     
     
     if(res.statusCode===401){
          
let retoken= await ReToken();
if (!retoken) return [];

res =await FetchApi_Function(url,             
{"Content-Type":"application/json",
     'Authorization': `Bearer ${retoken}`});
     }
     
     return res;
}



