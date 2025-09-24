import { useContext, useEffect, useState } from "react";
import "./account.css";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";

export default function Account() {

const {islogin}=useContext(UserContext);
const navigate=useNavigate(null);

useEffect(()=>{
  if(!islogin()) navigate("/sigunp");
  
},[])


  return (
    <div className="account-container">
      <aside className="account-sidebar">
        <div>
          <h3>Manage My Account</h3>
          <ul>
            <li>
              <NavLink  to="profile">
                My Profile
              </NavLink>
            </li>
          
          </ul>

          <h3>My Orders</h3>
          <ul>
            <li>
              <NavLink to="allOrders">Orders</NavLink>
            </li>
        
          </ul>

          <h3>My cart</h3>
              <ul>
            <li>
              <NavLink to="/cart">cart</NavLink>
            </li>
        
          </ul>
          <h3>My Wishlist</h3>
              <ul>
            <li>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>
        
          </ul>
        </div>
      </aside>

    <Outlet/>
    </div>
  );
}
