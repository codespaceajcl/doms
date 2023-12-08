import { GoHome } from "react-icons/go";
import { MdOutlineGridView } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const dashboardSidebar = [
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
        icon: <MdOutlineGridView />,
        title: "Track Plots",
    },
    {
        path: "",
        icon: <RiLogoutCircleRLine />,
        title: "Logout",
    }
];