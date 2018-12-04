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
            <SideMenu.MenuMultiItems
               name="Dashboard"
               Icon={<Home size={18} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
            </SideMenu.MenuMultiItems>      
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
            <SideMenu.MenuSingleItem >
               <NavLink to="/email" activeclassname="active">
                  <i className="menu-icon">
                     <Mail size={18} />
                  </i>
                  <span className="menu-item-text">Email</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem>
               <NavLink to="/calendar" activeclassname="active">
                  <i className="menu-icon">
                     <Calendar size={18} />
                  </i>
                  <span className="menu-item-text">Calender</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            
            <SideMenu.MenuMultiItems
               name="Charts"
               Icon={<BarChart2 size={18} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
               <NavLink to="/charts/chartjs" className="item" activeclassname="active">
                  <span className="menu-item-text">ChartJS</span>
               </NavLink>
               <NavLink to="/charts/chartist" className="item" activeclassname="active">
                  <span className="menu-item-text">ChartistJS</span>
               </NavLink>
            </SideMenu.MenuMultiItems>            
         </SideMenu>
      );
   }
}

export default SideMenuContent;
