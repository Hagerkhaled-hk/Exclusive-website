
import UpdateAPi_Function from "../commonFunctions/updateFuntion.js";

export default async function UpdateCategory(intialData,id)
{

     

     let res =await UpdateAPi_Function(`${import.meta.env.VITE_CATEGORY_ID_API}/${id}`,
         {"Content-Type":"application/json",

}
             ,intialData 
     );

         
         


     return res;
}

