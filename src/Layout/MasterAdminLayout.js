import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import NotFound from "../Container/Pages/NotFound/NotFound";
import { GoHome } from "react-icons/go";
import { MdOutlineGridView } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineShareLocation } from "react-icons/md";

const MasterAdminLayout = () => {
    const userFound = JSON.parse(localStorage.getItem("user"))

    const dashboardSidebar = [
        {
            path: "/dashboard",
            icon: <GoHome />,
            title: "Dashboard",
        },
        {
            path: "/dashboard/registration",
            icon: <MdOutlinePersonAddAlt />,
            title: "Registration",
        },
        {
            path: "/dashboard/application",
            icon: <MdOutlineGridView />,
            title: "View Applications",
        },
        {
            path: "/dashboard/track-plots",
            icon: <MdOutlineShareLocation />,
            title: "Track Plots",
        },
        {
            path: "",
            icon: <RiLogoutCircleRLine />,
            title: "Logout",
        }
    ];
    return (
        <div>
            {
                userFound && userFound.access === 'masterAdmin' ? <>
                    <Header />

                    <div className="dashboard_div">
                        <div className="left_dashboard">
                            <Sidebar dashboardSidebar={dashboardSidebar} />
                        </div>
                        <div className="right_dashboard">
                            <Outlet />
                        </div>
                    </div>
                </> : <NotFound />
            }
        </div>
    );
};
export default MasterAdminLayout;
