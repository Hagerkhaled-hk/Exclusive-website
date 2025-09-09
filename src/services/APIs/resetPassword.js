




import CreateAPi_Function from "./commonFunctions/createFunction.js";


export default async function RestPassword(intialData)
{ 
      
     let res =await CreateAPi_Function(import.meta.env.VITE_RESTPASSWORD_API, {"Content-Type":"application/json"} , intialData );
     return res;

}



