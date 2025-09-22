import toast from "react-hot-toast";
import ReGenerateToken from "../Auth/reGenerateToken";

export async function ReToken()
    {
        console.log("Retoken Call");
        

         if(localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined)        {     

            
             let Data= JSON.parse(localStorage.getItem("userData")) ;
               console.log("Data",Data
);
                 console.log("Data.refreshToken",Data.refreshToken);
                   
    let res = await ReGenerateToken(Data.refreshToken);
if(!res.Data){
    
    toast(
  "Your session has expired, please login again.",
  {
    duration: 3000,
  }
);
localStorage.removeItem("userData",)
localStorage.removeItem("user_Address_Payment");

window.location.href="/login";

    ;}

    
    Data.accessToken=res.data.accessToken;
    Data.refreshToken=res.data.refreshToken;
    localStorage.setItem("userData" , JSON.stringify({...Data}));
    window.dispatchEvent(new Event('localStorageChange'));
    
    return res.data.accessToken; 

        }


    return "";
    }



