import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faHome,faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  const tabs = [
    {
      route: "/",
      icon: (
        <FontAwesomeIcon
        className="searchIcon"
      icon={faHome}
     
    />
      ),
      label: "",
    },
   
    {
      route: "/cartmobile",
      icon: (
       
        <FontAwesomeIcon
                    className="searchIcon"
                  icon={faShoppingBag}
                 
                />
        
      ),
      label: "",
    },
    {
      route: "/orders",
      icon: (
        <FontAwesomeIcon
                    className="searchIcon"
                  icon={faUserAlt}
                 
                />
      ),
      label: "",
    },
  ];
  return (
    <div>
      <nav
        className="navbar fixed-bottom navbar-light bottom-tab-nav"
        role="navigation"
      >
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {tabs.map((tab, index) => (
              <NavItem key={`tab-${index}`}>
                <NavLink
                  to={tab.route}
                  className="nav-link bottom-nav-link"
                  activeClassName="active"
                >
                  <div className="row d-flex flex-column mobile-touch">
                    {tab.icon}
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))}
          </div>
        </Nav>
      </nav>
    </div>
  );
};
export default Navigation;
