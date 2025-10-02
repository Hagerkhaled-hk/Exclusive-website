import { createContext, useState } from "react";



export const DashboardContext= createContext();


export default  function DashboardProvider({children})
{
    const [navOpen, setNavOpen] = useState(false);


    return (
        <DashboardContext.Provider  value={{navOpen, setNavOpen}} >
{children}
        </DashboardContext.Provider>
    )
}