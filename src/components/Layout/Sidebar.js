import { useState } from "react";
import {
  initialMenuState,
  sidebarRoutes,
} from "../utils/sidebar.utils/side.options";
import { NavLink } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <ArrowForwardIosOutlinedIcon />
      </button>
      <ul className="sidebar-items">
        {sidebarRoutes.map((item, index) => (
          <li key={index} className="sidebar-item">
            <NavLink to={item.route} activeClassName="active">
              {item.img}
              {isOpen && <span className="sidebar-label">{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
