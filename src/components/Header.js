import React  from 'react';
import {
    Nav,
    Navbar
} from 'react-bootstrap';
import Logo from '../assets/premier-league-logo-white.png';

const Header = () => {
    return (
        <Navbar 
            collapseOnSelect
            expand="lg"
            variant="dark" 
            bg="dark" 
            className="justify-content-between" 
            sticky="top"
        >
            <Navbar.Brand href="#">
                <img
                    alt="Premier League"
                    src={Logo}
                    width="100"
                    height="55"
                    className="d-inline-block align-top center"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#teams">Teams</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>        
        </Navbar>
    );
};

export default Header;