

import CreateAPi_Function from "../commonFunctions/createFunction.js";


export default async function Google_Login_Api(intialData,Token)
{ 
      
     let res =await CreateAPi_Function(import.meta.env.VITE_Google_LOGIN_API,{"Content-Type":"application/json",
        'Authorization': `Bearer ${Token}`
     },intialData );
     return res;

}



