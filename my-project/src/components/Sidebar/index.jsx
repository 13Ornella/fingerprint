import React from "react";
import Button from '@mui/material/Button';
import { MdDashboard, MdEmail } from "react-icons/md";
import { FaChartPie, FaFacebook, FaInstagram, FaPhone, FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () =>{
    return(
        <>
        <div className="
        sidebar fixed top-0 left-0 z-[100] w-[15%]">  

        <div className="sidebarTabs py-8 pb-20">
            {/*<Button className="w-100 text-sm group-hover:bg-black/70 gap-2">
                <span className="icon rounded-md text-gray-400 w-[20px] h-[25px] flex items-center justify-center">
                <MdDashboard /></span>
                 <Link to={'/'} className="text-gray-400">Dashboard</Link> </Button>*/}
           <Button className="w-100 text-sm gap-2 ">
                <span className="icon rounded-md text-gray-400 w-[20px] h-[25px]  flex items-center justify-center">
                <FaUser /></span>
                 <Link to={'/Users'} className="text-gray-400">  Utilisateur</Link>
                </Button>
                 <Button className="w-100 text-sm gap-2">
                <span className="icon rounded-md w-[20px] text-gray-400 h-[25px] flex items-center justify-center">
                <FaChartPie /></span>
                <Link to={'/'} className="text-gray-400">Statistique</Link></Button>
                 <Button className="w-100 text-sm gap-2">
                <span className="icon rounded-md text-gray-400 w-[20px] h-[25px] flex items-center justify-center">
                <IoNotifications/> </span>
                <Link to={"/presence"} className="text-gray-400">Absences</Link></Button>          
        </div>
        <div className="pt-96">
        <Button className="w-100 text-sm">
                <span className="icon rounded-md gap-8 text-gray-400 h-[25px] flex items-center justify-center">
                 <FaFacebook/> <FaInstagram/> <MdEmail/> <FaPhone/> </span>
                 </Button>
        </div>
             </div>
      
        </>
    )       
}
export default Sidebar;