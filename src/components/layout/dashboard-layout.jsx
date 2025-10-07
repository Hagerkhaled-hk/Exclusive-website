import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
 import Nav from '../../dashboard/common/Nav/Nav.jsx';
import DashboardProvider from '../../dashboard/context/dashboardContext';
import ProductDashboard_Provider from '../../dashboard/context/productContext';
import "../../dashboard/css/DashboardPage.css"
import Header from '../../dashboard/common/header/header.jsx';
import CategoryDashboard_Provider from '../../dashboard/context/categoryContext.jsx';
import ErrorPage from '../../Common/errorPage/errorPage.jsx';
import LoadingModal from '../../Common/modal/modal.jsx';

export default function DashboardLayout()
{
    const[isLogin,setIsLogin]=useState(undefined);

    useEffect(()=>{
        let data = localStorage.getItem("adminData");
        if(data)setIsLogin(true) ;
        else setIsLogin(false) 
    },[])
    return <>
    {
         isLogin==undefined?<LoadingModal loading={true}/>:
        !isLogin?<ErrorPage/>
        :

        <ProductDashboard_Provider>
            <CategoryDashboard_Provider>
    <div className="Dasboard-layout" >
         <div className="fixed-bg">
 <Nav/>
            <div className="DashboardPage Dashboard-content">
                <Header/>

 <Outlet/>
             </div>

 </div>
    </div>  
    </CategoryDashboard_Provider>
</ProductDashboard_Provider>
    }



        
    </>
    
    

 ;
}