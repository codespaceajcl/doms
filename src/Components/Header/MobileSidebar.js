import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { successNotify } from "../../Utils/Toast";
import userAvatar from "../../images/user_avatar.png"

function MobileSidebar({ navbarRef, NavHandler, sideBarItems }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        navbarRef.current.style.width = "0%";
    }, [pathname]);

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/')
        successNotify("Logout Successfully!")
    }

    return (
        <div className="overlay" ref={navbarRef}>
            <span className="closebtn" onClick={NavHandler}>
                <MdClose />
            </span>
            <div className={"overlay-content"}>
                <div className="d-flex align-items-center text-white gap-2 mb-3">
                    <div className="mobile_sidebar_avatar">
                        <img src={userAvatar} alt="" />
                    </div>
                    <div>
                        <NavDropdown title={currentUser?.name}>
                            <NavDropdown.Item onClick={logoutHandler}>
                                <Link>Logout</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                {sideBarItems?.map((item, index) => {
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={pathname === item.path ? "nav-active" : "nav-link"}
                        >
                            <span className="overlay-content-number"> {index < 9 ? `0${index + 1}` : `${index + 1}`} - </span>
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
export default MobileSidebar;