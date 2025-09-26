import { data } from "react-router-dom";


export default async function CreateAPi_Function (initialUrl,headersData,intialData){
 
    console.log(initialUrl);
    console.log(headersData);
    console.log(intialData);
    
    
 try {

    let res = await  fetch(initialUrl,{

        method:"POST",
        body:JSON.stringify(intialData),
        headers:headersData
    })
    
const {status , ok }= res;
const resJson=await res.json();
 if(!ok) return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});

// Http  level error (status code) 
            
            


const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return resJson;
        } else {
            return await resJson;
        }


    } catch(error) {
        return false;
        /*  throw new Error (error.message);
        */
    }
}
