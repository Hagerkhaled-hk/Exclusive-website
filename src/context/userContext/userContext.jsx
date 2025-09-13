import { createContext, useEffect, useState } from "react"


export const UserContext=createContext();


export default function UserProvider({children})
{

const [userLogin ,setUserLogin]=useState(false)

    const [userData,setUserData]=useState({});

    function UserDataSetting()
    {
         if(localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined)
        {
            let Data= JSON.parse(localStorage.getItem("userData")) ;
            console.log("userData",Data);
            setUserData(Data);
            
            
    
        
        }
    }

function isLogin()
{
    console.log("userLogin",userLogin);
    
 return userLogin;
/*   return(localStorage.getItem("userData")!=null ||localStorage.getItem("userData")!=undefined);
 */}


function getToken()
{
 
  return  Object.keys(userData)?  userData.accessToken : "";
}


    return <UserContext.Provider value={{UserDataSetting,isLogin ,setUserLogin, getToken
    }}>
        {children}
    </UserContext.Provider>

}