import React, { useContext } from 'react';
import "./css/Header.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DashboardContext } from '../../context/dashboardContext';
import { UserContext } from '../../../context/userContext/userContext';
import toast from 'react-hot-toast';
import Logout from '../../../services/APIs/Auth/logout';

export default function Header() {
    const  path  = useLocation();
    const {navOpen, setNavOpen,getAdminToken,isAdminLogin} = useContext(DashboardContext);
const navigate =useNavigate();

async function Log_out()
{
let token =getAdminToken();
if(!token)return;
 let res = await Logout(token);
    if(res.statusCode==200){  localStorage.removeItem('adminData'); navigate("/ADMIN__LOGINDASHBOARD");  }
    else toast.error(res.message||"Unable to logout");
    
}


    return (
        <div className="Header">
            <div className="left d-flex justify-content-center align-items-center gap-2">
                <button
                    className="menu-toggle btn "
                    aria-label="Toggle navigation"
                    onClick={() =>{ setNavOpen(!navOpen)}}
                >
                    ☰
                </button>
                <p className='m-0'>
                    <span>Pages</span>  {path.pathname?? 'Dashboard'}
                </p>
            </div>
            <div className="right">
               
                <button onClick={()=>{Log_out();
}} className='btn '>{isAdminLogin ?"Logout" :"Login"}</button>
            </div>
        </div>
    );
}