import React from 'react';
import "./css/Header.css"
import { useParams } from 'react-router-dom';

export default function Header({ navOpen, setNavOpen }) {
    const { path } = useParams();

    return (
        <div className="Header">
            <div className="left">
                <button
                    className="menu-toggle"
                    aria-label="Toggle navigation"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    ☰
                </button>
                <p>
                    <span>Pages</span> / {path ?? 'Dashboard'}
                </p>
                <h6>{path ?? 'Dashboard'}</h6>
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