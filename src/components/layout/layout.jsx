import {Outlet} from "react-router-dom"
import Nav from "../../Common/nav/nav";
import Footer from "../../Common/footer/footer";
import { Toaster } from "react-hot-toast";
export default function Layout()
{

    return <div className="layout">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
 <Nav/>
 


{/*  Children*/}

<Outlet/>

  <Footer/> 
   </div>
}