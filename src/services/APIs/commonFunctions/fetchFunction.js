

export default async function FetchApi_Function (initialUrl,headersData){
    try
    {
      
        
let res=await fetch(initialUrl,{

      headers:headersData

});
const {status,ok}= res;




console.log(ok ,status);


 if(!ok)
    {
        try{
const resJson=await res.json();
            return ({ statusCode: status|| resJson.statusCode  ,message:resJson.message});
        }
        catch(error)
        {
            return ({ statusCode: status  ,message:'There is a problem in connection , please login again'});

        }
    } 


return await res.json();

    }
    catch(error)
    {
        console.log(error);
        
return  { statusCode:0  ,message:error} ;
}
}