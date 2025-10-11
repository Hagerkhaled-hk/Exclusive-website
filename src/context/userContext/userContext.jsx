import { createContext,  useEffect, useState } from "react"


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
        
        console.log("UserLogin", "UserDataSetting");
         if(localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined)
        {  
            console.log("ddd");
            
            let Data= JSON.parse(localStorage.getItem("userData")) ;
            setUserData(Data);
            setUserLogin(true);
            
        }
        else
        {
            console.log("done");
            
            setUserData([]);
            setUserLogin(false);

        }
    }



function isLogin()
{
console.log("userLogin", userLogin);

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
        



    return <UserContext.Provider value={{isLogin ,setUserLogin, getToken,userData }}>
        {children}
    </UserContext.Provider>

}