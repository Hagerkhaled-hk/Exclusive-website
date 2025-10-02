import React, { useContext } from 'react';
import "./css/Header.css"
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../../context/dashboardContext';

export default function Header() {
    const { path } = useParams();
    const {navOpen, setNavOpen} = useContext(DashboardContext);
console.log(typeof(setNavOpen));
console.log(navOpen);



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
                    <span>Pages</span> / {path ?? 'Dashboard'}
                </p>
            </div>
            <div className="right">
                <div className="input">
                    <input type="text" placeholder="Type here" />
                </div>
                <p>Sign In</p>
            </div>
        </div>
    );
}