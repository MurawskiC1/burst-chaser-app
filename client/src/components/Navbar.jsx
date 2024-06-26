import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Function to handle link click and hide menu
    const handleLinkClick = () => {
        setShowMenu(false);
    };

    return (
        //create the navbar
        <nav className='navbar'>
            <Link to='/' onClick={handleLinkClick}>
                <h1 className="company">Burst Chaser</h1>
            </Link>
            {/* Hamburger menu icon */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
            </div>
            <ul className={`menu ${showMenu ? 'active' : ''}`}>
                <li>
                    <Link to="/" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Home</h1>
                    </Link>
                </li>
                <li>
                    <Link to="data" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Explore</h1>
                    </Link>
                </li>
                <li>
                    <Link to="classify" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Classify</h1>
                    </Link>
                </li>
                <li>
                    <Link to="download" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Download</h1>
                    </Link>
                </li>


            </ul>
        </nav>
    );
}


