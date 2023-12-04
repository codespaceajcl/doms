import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import NotFound from "../Container/Pages/NotFound/NotFound";

const UserLayout = () => {
    const userFound = JSON.parse(localStorage.getItem("user"))
    return (
        <div>
            {
                userFound ? <>
                    <Header />

                    <div className="dashboard_div">
                        <div className="left_dashboard">
                            <Sidebar />
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
export default UserLayout;
