import toast from "react-hot-toast";
import ReGenerateToken from "../Auth/reGenerateToken";

export async function ReToken(isAdmin)
    {
        
        let Data_local=isAdmin?localStorage.getItem("adminData"):localStorage.getItem("userData");

           let Data= JSON.parse(Data_local) ;

                   
    let res = await ReGenerateToken(Data?.refreshToken);
if(!res.Data){
  
  toast(
"Your session has expired, You have to  login again in sec ...",
{
  duration: 3000,
}
);    

  setTimeout(()=>{

    
    localStorage.removeItem(isAdmin?"adminData":"userData");
    (!isAdmin)&&localStorage.removeItem("user_Address_Payment");
    window.location.href=isAdmin?"/ADMIN__LOGINDASHBOARD":"/login" ;
  },3000)


}
    
    Data.accessToken=res.data.accessToken;
    Data.refreshToken=res.data.refreshToken;
    localStorage.setItem(isAdmin?"adminData":"userData" , JSON.stringify({...Data}));
    window.dispatchEvent(new Event('localStorageChange'));
    
    return res.data.accessToken; 

        


    }



