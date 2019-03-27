import React  from 'react';
import {
    Navbar
} from 'react-bootstrap';
import Logo from '../assets/premier-league-logo-white.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar variant="dark" bg="dark">
            <Link to={'/'}>
                <Navbar.Brand>
                    <img
                        alt=""
                        src={Logo}
                        width="150"
                        height="80"
                        className="d-inline-block align-top center"
                    />
                </Navbar.Brand>
            </Link>
        </Navbar>
    );
};

export default Header;