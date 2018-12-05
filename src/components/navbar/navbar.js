// import external modules
import React, { Component } from "react";
import Link from "redux-first-router-link";
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import {
   Form,
   Input,
   Collapse,
   Navbar,
   Nav,
   NavItem,   
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,  
   DropdownItem
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
   Mail,
   Menu,
   MoreVertical,
   Bell,
   User,
   Search,
   Inbox,
   Phone,
   Calendar,
   Lock,
   X,
   LogOut
} from "react-feather";
import ReactCountryFlag from "react-country-flag";

import Auth from '../../Auth/Auth';
const auth = new Auth();
const JSON = require('circular-json');

// import internal(own) modules
// import { FullScreenConsumer } from "../../../utility/context/fullScreenContext";

// const Navbar = props => (
class ThemeNavbar extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu('open');
   };
   constructor(props) {      
      super(props);      
      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false,         
      };      
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      var userProfile =JSON.parse(JSON.stringify(this.props.app.auth.profileN));
      console.log('User Profileeeeeeeeeeeeeeeeeeeeeeeeeeeee', userProfile);
      
      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
                  <Form className="navbar-form mt-1 float-left" role="search">
                     <div className="position-relative has-icon-right">
                        <Input className="form-control round" placeholder="Search" type="text" />
                        <div className="form-control-position">
                           <Search size={16} className="mb-0" />
                        </div>
                     </div>
                  </Form>
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <ReactCountryFlag code="us" svg /> EN
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <ReactCountryFlag code="us" svg /> English
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="fr" svg /> France
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="es" svg /> Spanish
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="cn" svg /> Chinese
                              </DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className="pr-1">
                           <Link to="/email/" className="nav-link">
                              <Mail size={20} color="#333" />
                           </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <span className="notification-bell-blink" />
                              <Bell size={21} className="text-dark notification-danger animate-shake" />
                           </DropdownToggle>
                           <DropdownMenu right className="notification-dropdown">
                              <div className="p-2 text-center  border-bottom-grey border-bottom-lighten-2">
                                 <h6 className="mb-0 text-bold-500">Notifications</h6>
                              </div>
                           </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userProfile.picture} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span className="font-small-3">
                                    {userProfile.name} 
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <Link to="/pages/user-profile" className="p-0">
                                 <DropdownItem>
                                    <User size={16} className="mr-1" /> My Profile
                                 </DropdownItem>
                              </Link>
                              <Link to="/email" className="p-0">
                                 <DropdownItem>
                                    <Inbox size={16} className="mr-1" /> Email
                                 </DropdownItem>
                              </Link>
                              <Link to="/contacts" className="p-0">
                                 <DropdownItem>
                                    <Phone size={16} className="mr-1" /> Contacts
                                 </DropdownItem>
                              </Link>
                              <Link to="/calendar" className="p-0">
                                 <DropdownItem>
                                    <Calendar size={16} className="mr-1" /> Calendar
                                 </DropdownItem>
                              </Link>
                              <DropdownItem divider />
                              <Link to="/pages/lockscreen" className="p-0">
                                 <DropdownItem>
                                    <Lock size={16} className="mr-1" /> Lock Screen
                                 </DropdownItem>
                              </Link>
                              <Link to={{type:'HOME'}} className="p-0">
                                 <DropdownItem>
                                    <LogOut onClick={this.props.app.auth.logout}size={16} className="mr-1" /> Logout
                                 </DropdownItem>
                              </Link>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

const mapStateToProps = (state) => {
   return state;
 };
 
export default injectIntl(connect(mapStateToProps)(ThemeNavbar));
 
