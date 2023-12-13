import { GoHome } from "react-icons/go";
import { MdOutlineGridView } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineShareLocation } from "react-icons/md";

const userFound = JSON.parse(localStorage.getItem("user"))
let role = userFound?.access;

let dashboardSidebar;
if (role === 'user') {
    dashboardSidebar = [
        {
            path: "/dashboard/registration",
            icon: <MdOutlinePersonAddAlt />,
            title: "Registration",
        },
        {
            path: "",
            icon: <RiLogoutCircleRLine />,
            title: "Logout",
        }
    ];
}
else if (role === 'admin') {
    dashboardSidebar = [
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
            path: "",
            icon: <RiLogoutCircleRLine />,
            title: "Logout",
        }
    ];
}

else if (role === 'masterAdmin') {
    dashboardSidebar = [
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
}

export default dashboardSidebar;