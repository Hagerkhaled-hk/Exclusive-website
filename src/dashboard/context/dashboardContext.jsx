import { createContext, useEffect, useState } from "react";



export const DashboardContext= createContext();


export default  function DashboardProvider({children})
{
    const [navOpen, setNavOpen] = useState(false);
const[adminData,setAdminData]=useState({});
const [adminLogin,setAdminLogin]=useState(false);




     useEffect(()=>{
    
    
       window.addEventListener('localStorageChange',()=>{AdminDataSetting()} );
       return () => window.removeEventListener('localStorageChange', AdminDataSetting());
          },[])  
         

         useEffect(()=>{
        window.dispatchEvent(new Event('localStorageChange'));
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
        
    return (
        <DashboardContext.Provider  value={{navOpen, setNavOpen,isAdminLogin,getAdminToken,adminData}} >
{children}
        </DashboardContext.Provider>
    )
}