import React from 'react';
import { Outlet } from 'react-router-dom';
 import Nav from '../../dashboard/common/Nav/Nav.jsx';
import DashboardProvider from '../../dashboard/context/dashboardContext';
import ProductDashboard_Provider from '../../dashboard/context/productContext';
import "../../dashboard/css/DashboardPage.css"
import Header from '../../dashboard/common/header/header.jsx';
import CategoryDashboard_Provider from '../../dashboard/context/categoryContext.jsx';

export default function DashboardLayout()
{

    return <DashboardProvider >
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
    </DashboardProvider>
 ;
}