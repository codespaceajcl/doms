import React from 'react';
import { dashboardSidebar } from '../../Container/Dashboard/Routes/Routes';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className='sidebar_main'>
            <ul>
                {
                    dashboardSidebar?.map((s) => {
                        return (
                            <li className={pathname === s.path ? 'side_active' : ''}
                                onClick={s.path.length > 0 ? () => navigate(s.path) : () => navigate('/')}>
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
