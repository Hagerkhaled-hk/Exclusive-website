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
              <NavLink to="allOrders">Current orders</NavLink>
            </li>
            <li>
              <NavLink to="#"> Deliverd orders</NavLink>
            </li>
            <li>
              <NavLink to="#"> Cancellations</NavLink>
            </li>
          </ul>

          <h3>My Wishlist</h3>
        </div>
      </aside>

    <Outlet/>
    </div>
  );
}
