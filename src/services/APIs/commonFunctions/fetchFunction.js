

export default async function FetchApi_Function (initialUrl,headersData){
    try
    {
      
let res=await fetch(initialUrl,{

      headers:headersData

});
const {status,ok}= res;
const resJson=await res.json();
 if(!ok) return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});


return await resJson;

    }
    catch(error)
    {
false
}
}