import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { successNotify } from '../../Utils/Toast';

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/')
        successNotify("Logout Successfully!")
    }
    return (
        <div>
            <Navbar className="main_header">
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Nav>

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
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
