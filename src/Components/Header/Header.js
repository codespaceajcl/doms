import React, { useRef } from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { successNotify } from '../../Utils/Toast';
import MobileSidebar from './MobileSidebar';
import { dashboardSidebar } from '../../Container/Dashboard/Routes/Routes';

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const navbarRef = useRef();

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/')
        successNotify("Logout Successfully!")
    }

    const NavHandler = () => {
        if (navbarRef.current.style.width === "100%")
            navbarRef.current.style.width = "0%";
        else navbarRef.current.style.width = "100%";
    };

    return (
        <div>
            <MobileSidebar
                navbarRef={navbarRef}
                NavHandler={NavHandler}
                sideBarItems={dashboardSidebar}
            />
            <Navbar className="main_header" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand>
                        <div>
                            <img src='/images/main_logo.jpg' alt='' />

                            <div>
                                <p>Government Of Pakistan</p>
                                <h6>Capital Development Authority</h6>
                                <p>Islamabad</p>
                            </div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={NavHandler} />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <div className='user_detail'>
                                <div>
                                    <p>Greetings,</p>
                                    <h6>{currentUser?.name}</h6>
                                </div>

                                <div className='user_img'>
                                    <img src='/images/user_avatar.png' alt='' />
                                    <NavDropdown title="" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <Link>Logout</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
