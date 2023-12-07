import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dashboardSidebar } from '../../Container/Dashboard/Routes/Routes';
import { successNotify } from '../../Utils/Toast';
import './Sidebar.css';
import { Modal } from 'react-bootstrap';

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/')
        successNotify("Logout Successfully!")
    }

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
        <div className='sidebar_main'>
            {modal}
            <ul>
                {
                    dashboardSidebar?.map((s) => {
                        return (
                            <li className={pathname === s.path ? 'side_active' : ''}
                                onClick={s.path.length > 0 ? () => navigate(s.path) : () => setShow(true)}>
                                {s.icon}
                                {s.title}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar
