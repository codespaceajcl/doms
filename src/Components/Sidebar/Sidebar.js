import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dashboardSidebar } from '../../Container/Dashboard/Routes/Routes';
import { successNotify } from '../../Utils/Toast';
import './Sidebar.css';

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/')
        successNotify("Logout Successfully!")
    }

    return (
        <div className='sidebar_main'>
            <ul>
                {
                    dashboardSidebar?.map((s) => {
                        return (
                            <li className={pathname === s.path ? 'side_active' : ''}
                                onClick={s.path.length > 0 ? () => navigate(s.path) : logoutHandler}>
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
