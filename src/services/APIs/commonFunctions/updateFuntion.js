

export default async function UpdateAPi_Function (initialUrl,headers, intialData){

 try {

    let res = await  fetch(initialUrl,{

        method:"PUT",
        body:JSON.stringify(intialData),
        headers:headers
    })
    

// Http  level error (status code) 
const {status , ok }= res;
const resJson=await res.json();
 if(!ok) return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});


const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return resJson;
        } else {
            return resJson;
        }       }
        catch(error)
        {

return error;
        }
}
