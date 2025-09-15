import {Outlet} from "react-router-dom"
import Nav from "../../Common/nav/nav";
import Footer from "../../Common/footer/footer";
import { useContext, useEffect } from "react";
export default function Layout()
{

    return <div className="layout">
 <Nav/>
 


{/*  Children*/}

<Outlet/>

  <Footer/> 
   </div>
}