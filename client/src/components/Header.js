import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation()

    return (
        <header className='header'>
            <Link to="/">
                <h1>Parking Permit Dashboard</h1>
            </Link>
            {location.pathname === '/' && (
                <Link to="/permit">
                    <button className='btn' type='button'>Add Permit</button>
                </Link>
            )}
            
        </header>
    )
}

export default Header;
