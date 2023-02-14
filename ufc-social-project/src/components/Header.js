import React from 'react';
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Header() {

    return (
        <div className="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png" alt="UFC" />
            <NavLink className="nav-btn" to="/">
                <Button className="nav-btn">UFC CHAMPIONS</Button>
            </NavLink>
            <NavLink to="/form">
                <Button className="nav-btn">ADD CHAMPION</Button>
            </NavLink>
        </div>
    );
}

export default Header;