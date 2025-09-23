import { useEffect, useState } from "react";
import "./account.css";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Account() {

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
            <li>
              <NavLink to="/account/address">Address Book</NavLink>
            </li>
            <li>
              <NavLink to="#">My Payment Options</NavLink>
            </li>
          </ul>

          <h3>My Orders</h3>
          <ul>
            <li>
              <NavLink to="allOrders">Orders</NavLink>
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
