import { Link } from "react-router-dom";
import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { Dispatch, SetStateAction, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosHelpCircle, IoIosLogOut, IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
 
  
  const StaggeredDropDown = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className=" flex items-center">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="flex items-center gap-2 rounded-md text-indigo-50 bg-white hover:bg-indigo-500 transition-colors"
          >
            <span className="font-medium text-sm"> <div>
    <button type="button" class="inline-flex" id="menu-button" aria-expanded="true" aria-haspopup="true">
      <FaUser className="text-gray-400 w-[15px] h-[20px]"/>
         </button>
  </div></span>
            <motion.span variants={iconVariants}>
              <FiChevronDown className="text-gray-400"/>
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
            <Option setOpen={setOpen} Icon={CgProfile} text="Profil" />
            <Option setOpen={setOpen} Icon={IoIosSettings} text="Parametre" />
            <Option setOpen={setOpen} Icon={IoIosHelpCircle} text="Aide" />
            <Link to="/login">
            <Option
              setOpen={setOpen}
              Icon={IoIosLogOut}
              text="Se deconnecter"
            />
          </Link>
          </motion.ul>
        </motion.div>
      </div>
    );
  };
  
  const Option = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default StaggeredDropDown;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };