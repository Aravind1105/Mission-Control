// Styling
import "../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";

// import external modules
import React, { Component } from "react";
import {
   Home,
   Mail,
   ChevronRight,      
   BarChart2,
   Calendar,   
   Users,
   Book,
   Grid,
   ShoppingCart,
   CreditCard
} from "react-feather";
import { NavLink } from "redux-first-router-link";


// import internal(own) modules
import SideMenu from "../sidemenuHelper";

class SideMenuContent extends Component {
   render() {
      return (
         <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuSingleItem>
               <NavLink to="/dashboard" activeclassname="active">
                  <i className="menu-icon">
                     <Home size={18} />
                  </i>
                  <span className="menu-item-text">Dashboard</span>
               </NavLink>
            </SideMenu.MenuSingleItem> 
            <SideMenu.MenuSingleItem>
               <NavLink to="/users" activeclassname="active">
                  <i className="menu-icon">
                     <Users size={18} />
                  </i>
                  <span className="menu-item-text">Users</span>
               </NavLink>
            </SideMenu.MenuSingleItem>        
            <SideMenu.MenuSingleItem>
               <NavLink to="/fridges" activeclassname="active">
                  <i className="menu-icon">
                     <Book size={18} />
                  </i>
                  <span className="menu-item-text">Fridges</span>
               </NavLink>
            </SideMenu.MenuSingleItem>         
            <SideMenu.MenuSingleItem>
               <NavLink to="/products" activeclassname="active">
                  <i className="menu-icon">
                     <Grid size={18} />
                  </i>
                  <span className="menu-item-text">Products</span>
               </NavLink>
            </SideMenu.MenuSingleItem>   
            <SideMenu.MenuSingleItem>
               <NavLink to="/orders" activeclassname="active">
                  <i className="menu-icon">
                     <ShoppingCart size={18} />
                  </i>
                  <span className="menu-item-text">Orders</span>
               </NavLink>
            </SideMenu.MenuSingleItem> 
            <SideMenu.MenuSingleItem>
               <NavLink to="/payments" activeclassname="active">
                  <i className="menu-icon">
                     <CreditCard size={18} />
                  </i>
                  <span className="menu-item-text">Payments</span>
               </NavLink>
            </SideMenu.MenuSingleItem> 
         </SideMenu>
      );
   }
}

export default SideMenuContent;
