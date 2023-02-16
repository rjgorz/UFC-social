import React from 'react';
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Header() {

    return (
        <div className="nav-header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png" alt="UFC" />
            <Button.Group id='socials'>
                <a href='https://www.youtube.com/ufc' target='_blank' rel="noreferrer"><Button circular color='youtube' icon='youtube' /></a>
                <a href='https://facebook.com/ufc' target='_blank' rel="noreferrer"><Button circular color='facebook' icon='facebook' /></a>
                <a href='https://twitter.com/ufc' target='_blank' rel="noreferrer"><Button circular color='twitter' icon='twitter' /></a>
                <a href='https://www.instagram.com/ufc/' target='_blank' rel="noreferrer"><Button circular color='instagram' icon='instagram' /></a>
            </Button.Group>
            <Button.Group>
                <NavLink className="nav-btn" to="/">
                    <Button className="nav-btn">UFC CHAMPIONS</Button>
                </NavLink>
                <Button.Or />
                <NavLink to="/form">
                    <Button className="nav-btn">ADD A CHAMPION</Button>
                </NavLink>
                <Button.Or />
                <NavLink to="/feedback">
                    <Button className="nav-btn">GIVE FEEDBACK</Button>
                </NavLink>
            </Button.Group>
            
        </div>
    );
}

export default Header;