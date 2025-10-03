
import UpdateAPi_Function from "../commonFunctions/updateFuntion.js";

export default async function UpdateProduct(intialData,id)
{
for (const item of intialData.entries()) {
    console.log('intialData ', item);
}     
     
console.log(`${import.meta.env.VITE_PRODUCT_BY_ID_API}/${id}`);

     let res =await UpdateAPi_Function(`${import.meta.env.VITE_PRODUCT_BY_ID_API}/${id}`,
{ 'Accept': 'application/json' 
}
             ,intialData , false
     );

         
         


     return res;
}

