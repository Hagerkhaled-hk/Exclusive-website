
import DeleteAPi_Function from "../commonFunctions/deleteFunction.js";
export default async function DeleteCategory(id)
{

     let res =await DeleteAPi_Function(`${import.meta.env.VITE_CATEGORY_ID_API}/${id}`,
          {"Content-Type":"application/json",
    }    );

     return res;
}

