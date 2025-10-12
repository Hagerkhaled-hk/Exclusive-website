import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../../pages/login/login";
import Login_Api from "../../services/APIs/Auth/login";



export const DashboardContext= createContext();


export default  function DashboardProvider({children})
{
const [navOpen, setNavOpen] = useState(false);
const[adminData,setAdminData]=useState({});
const [adminLogin,setAdminLogin]=useState(false);
const[demoDashboard,setDemoDashBoard]=useState(undefined);


function DemoDashboardMode(path)
{
    console.log(path.pathname);

    
if(path.pathname.includes("/DemoDashboard")){setDemoDashBoard(true); console.log("true");
}
else{ setDemoDashBoard(false);console.log("false");}

}

  


     useEffect(()=>{
    
        window.dispatchEvent(new Event('localStorageChange'));
    
       window.addEventListener('localStorageChange',()=>{AdminDataSetting()} );
       return () => window.removeEventListener('localStorageChange', AdminDataSetting());
          },[])  
         

   
    


    function AdminDataSetting()
    {
         if(localStorage.getItem("adminData")!=null ||localStorage.getItem("adminData")!=undefined)
        {
            let Data= JSON.parse(localStorage.getItem("adminData")) ;
            setAdminData(Data);
            setAdminLogin(true);
            
        
        }
        else
        {
            setAdminData([]);
            setAdminLogin(false);

        }
    }



function isAdminLogin()
{

 return adminLogin;

}





function getAdminToken()
{   

         if( localStorage.getItem("adminData")!=null ||localStorage.getItem("adminData")!=undefined)
         {            
            let Data= JSON.parse(localStorage.getItem("adminData")) ;

            
             return Data.accessToken ;
         } 
             

         return  "";
         }
        


     /*  let  function  getDemoToken() {
            let res =await Login_Api()
         } */
    return (
        <DashboardContext.Provider  value={{navOpen, setNavOpen,isAdminLogin,getAdminToken,adminData,demoDashboard,setDemoDashBoard,DemoDashboardMode}} >
{children}
        </DashboardContext.Provider>
    )
}