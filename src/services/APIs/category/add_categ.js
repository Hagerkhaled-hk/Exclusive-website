
import CreateAPi_Function from "../commonFunctions/createFunction.js";
export default async function Add_Categ(intialData)
{
/* 
 console.log('intialData ', item);
} */
     let res =await CreateAPi_Function(import.meta.env.VITE_Add_CATEGORY_API,
        {"Content-Type":"application/json"} ,
     intialData 

     );

     
        
     return res;
}



