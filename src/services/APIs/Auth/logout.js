    import CreateAPi_Function from "../commonFunctions/createFunction.js";
import {  ReToken } from "../commonFunctions/TokenFunction.js";
    export default async function Logout(Token)
    {
/*     let Token =getToken();
 */    
         let res =await CreateAPi_Function(import.meta.env.VITE_LOGOUT_API,   
              {"Content-Type":"application/json",
         'Authorization': `Bearer ${Token}`});
    
    
         
    
         
         if(res.statusCode===401){
              
    let retoken= await ReToken();
    if (!retoken) return [];
    
    res  =await FetchApi_Function(import.meta.env.VITE_LOGOUT_API,    
    {"Content-Type":"application/json",
         'Authorization': `Bearer ${retoken}`});
         }


       if(res.succeeded) localStorage.removeItem("userData");
         
        
         return res;
    }
    