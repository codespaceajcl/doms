import React, { useRef, useState } from 'react';
import { Container, Modal, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { successNotify } from '../../Utils/Toast';
import MobileSidebar from './MobileSidebar';
import dashboardSidebar from '../../Container/Dashboard/Routes/Routes';
import mainLogo from "../../images/cda_logo.png";
import userAvatar from "../../images/user_avatar.png";
import './Header.css';

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const navbarRef = useRef();
    const [show, setShow] = useState(false)

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

    const modal = <Modal show={show} centered className='logout_modal'>
        <Modal.Body>
            <h3>Are you sure you want to logout?</h3>
            <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
                <button onClick={logoutHandler}>Yes</button>
                <button className='no_btn' onClick={() => setShow(false)}>No</button>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div>
            {modal}
            <MobileSidebar
                navbarRef={navbarRef}
                NavHandler={NavHandler}
                sideBarItems={dashboardSidebar}
            />
            <Navbar className="main_header" collapseOnSelect expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <div>
                            <img src={mainLogo} alt='' />
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
                                    <img src={userAvatar} alt='' />
                                    {/* <NavDropdown title="" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <Link>Logout</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown> */}
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;