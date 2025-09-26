

export default async function DeleteAPi_Function (initialUrl,headersData, intialData){

 try {

    let res = await  fetch(initialUrl,{

        method:"DELETE",
        body:JSON.stringify(intialData),
        headers:headersData
    })
    
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
false
        }
}
