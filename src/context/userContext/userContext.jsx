import { createContext, useEffect, useState } from "react"
import { data } from "react-router-dom";


export const UserContext=createContext();


export default function UserProvider({children})
{

const [userLogin ,setUserLogin]=useState(false)

    const [userData,setUserData]=useState({});

        useEffect(()=>{
    
    
      window.addEventListener('localStorageChange',()=>{UserDataSetting()} );
       return () => window.removeEventListener('localStorageChange', UserDataSetting());
         },[])  
         

         useEffect(()=>{
       window.dispatchEvent(new Event('localStorageChange'));
            },[])

    


    function UserDataSetting()
    {
         if(localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined)
        {
            let Data= JSON.parse(localStorage.getItem("userData")) ;
            setUserData(Data);
            setUserLogin(true);
            
        
        }
        else
        {
            setUserData([]);
            setUserLogin(false);

        }
    }



function isLogin()
{

 return userLogin;

}




function getToken()
{

         if( localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined)
         {            
            let Data= JSON.parse(localStorage.getItem("userData")) ;

            
             return Data.accessToken ;
         } 


         return  "";
         }
        



    return <UserContext.Provider value={{isLogin ,setUserLogin, getToken,userData
    }}>
        {children}
    </UserContext.Provider>

}