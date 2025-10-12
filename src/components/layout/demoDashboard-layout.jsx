import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
 import Nav from '../../dashboard/common/Nav/Nav.jsx';
import DashboardProvider, { DashboardContext } from '../../dashboard/context/dashboardContext';
import ProductDashboard_Provider from '../../dashboard/context/productContext';
import "../../dashboard/css/DashboardPage.css"
import Header from '../../dashboard/common/header/header.jsx';
import CategoryDashboard_Provider from '../../dashboard/context/categoryContext.jsx';
import ErrorPage from '../../Common/errorPage/errorPage.jsx';
import LoadingModal from '../../Common/modal/modal.jsx';
import OrderDashboardProvider from '../../dashboard/context/orderDashboardContext.jsx';
import "../../pages/account/account.css"

export default function DemoDashboardLayout()
{
    const{demoDashboard,DemoDashboardMode}=useContext(DashboardContext);

    const path =useLocation();

    useEffect(()=>{
        console.log(path);
        
                    DemoDashboardMode(path);

             },[path.pathname])


useEffect(()=>{
    console.log("demoDashBoard",demoDashboard);
    
},[demoDashboard])

    return <>
    {
         demoDashboard===undefined?<LoadingModal loading={true}/>:
     !demoDashboard?<ErrorPage/>
        :
<OrderDashboardProvider>
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
</OrderDashboardProvider>
    }



        
    </>
    
    

 ;
}