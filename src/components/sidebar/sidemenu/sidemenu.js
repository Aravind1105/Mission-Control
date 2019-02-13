// Styling
import '../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss';

// import external modules
import React, { Component } from 'react';
import * as Icon from 'react-feather';
import { NavLink } from 'redux-first-router-link';

// import internal(own) modules
import SideMenu from '../sidemenuHelper';

class SideMenuContent extends Component {
  render() {
    return (
      <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
        <SideMenu.MenuSingleItem>
          <NavLink to="/dashboard" activeclassname="active">
            <i className="menu-icon">
              <Icon.Home size={18} />
            </i>
            <span className="menu-item-text">Dashboard</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/fridges" activeclassname="active">
            <i className="menu-icon">
              <Icon.Book size={18} />
            </i>
            <span className="menu-item-text">Fridges</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/organizations" activeclassname="active">
            <i className="menu-icon">
              <Icon.Briefcase size={18} />
            </i>
            <span className="menu-item-text">Organizations</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/users" activeclassname="active">
            <i className="menu-icon">
              <Icon.Users size={18} />
            </i>
            <span className="menu-item-text">Users</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/products" activeclassname="active">
            <i className="menu-icon">
              <Icon.Grid size={18} />
            </i>
            <span className="menu-item-text">Products</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/transactions" activeclassname="active">
            <i className="menu-icon">
              <Icon.ShoppingCart size={18} />
            </i>
            <span className="menu-item-text">Transactions</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/reports" activeclassname="active">
            <i className="menu-icon">
              <Icon.BarChart size={18} />
            </i>
            <span className="menu-item-text">Reports</span>
          </NavLink>
        </SideMenu.MenuSingleItem>
      </SideMenu>
    );
  }
}

export default SideMenuContent;
