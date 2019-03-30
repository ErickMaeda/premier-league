import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../assets/premier-league-logo-white.png';

export default (WrappedComponent) => {

    class EnhancedComponent extends React.Component {

        renderLink = (title, href) => {
            const {
                location: {
                    pathname
                }
            } = this.props;

            const active = pathname.includes(href);

            return (
                <Nav.Link active={active} href={"#" + href}>{title}</Nav.Link>
            );
        };

        render() {            
            return (
                <div>
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
                                {this.renderLink('Teams', 'teams')}
                                {this.renderLink('About', 'about')}                        
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div>
                        <WrappedComponent {...this.props}/>
                    </div>
                </div>
            );
        };
    }

    return EnhancedComponent;
};