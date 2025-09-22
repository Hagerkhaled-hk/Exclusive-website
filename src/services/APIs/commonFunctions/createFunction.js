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
    

    if(!res.ok) return { statusCode: res.status};

// Http  level error (status code) 
            
            


const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        } else {
            return await res.text();
        }


    } catch(error) {
        return false;
        /*  throw new Error (error.message);
        */
    }
}
