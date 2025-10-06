

export default async function UpdateAPi_Function (initialUrl,headers, intialData,stringfyData=true){

    console.log("intial Api funtction" ,intialData);
    
 try {

    let res = await  fetch(initialUrl,{

        method:"PUT",
     body: stringfyData? JSON.stringify(intialData): intialData,
        headers:headers
    })
    

// Http  level error (status code) 
const {ok , status} = res;

 if(!ok)
    {

        try{
const resJson=await res.json();

          return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});   
        }
        
        catch(error)
        {
          return ({ statusCode: status  ,message:'There is a problem in connection , please login again'});   

        }}



const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        } else {
            return await res.text();
        }       }
        catch(error)
        {

return  { statusCode:0  ,message:error.message} ;
        }
}
