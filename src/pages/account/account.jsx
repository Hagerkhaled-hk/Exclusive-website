import { useContext, useEffect, useState } from "react";
import "./account.css";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

export default function Account() {

  const [SideBar,setSideBar]=useState(false);
const {isLogin}=useContext(UserContext);
const navigate=useNavigate(null);
useEffect(()=>{
  if(!isLogin()) navigate("/signup");
  
},[])


  return (
    <div className="account-container">
      <aside className={`account-sidebar ${SideBar?"active":""} `}>
        <div  onClick={()=>{setSideBar(!SideBar)}} className={`arrow ${SideBar?"active":""}`}>
          {
            SideBar ?
            
            <IoMdArrowDropleft/>
            :
          <IoMdArrowDropright/>
          }

        </div>
        <div>
          <h3>Manage My Account</h3>
          <ul>
            <li>
              <NavLink  to="">
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
          <h3>My Discounts</h3>
          <ul>
            <li>
              <NavLink to="discount">Discounts</NavLink>
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
