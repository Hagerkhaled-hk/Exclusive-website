import { data } from "react-router-dom";


export default async function CreateAPi_Function (initialUrl,headersData,intialData,stringfyData=true){
 
    
    
    
 try {

    let res = await  fetch(initialUrl,{

        method:"POST",
        body:stringfyData ?JSON.stringify(intialData):intialData,
        headers:headersData
    })
    
const {status , ok }= res;

 if(!ok)
    {
        
        try{
const resJson=await res.json();
console.log("responce",resJson);

            return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});
        }
        catch(error)
        {
            return ({ statusCode: status  ,message:'There is a problem in connection , please login again'});

        }
    } 

// Http  level error (status code) 
            
            


const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        } else {
            return await res.text();
        }


    } catch(error) {
return  { statusCode:0  ,message:error.message} ;
        /*  throw new Error (error.message);
        */
    }
}
