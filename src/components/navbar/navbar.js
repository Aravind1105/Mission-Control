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

// import internal(own) modules
import Auth from '../../Auth/Auth';
import avtarImg from "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg"

const auth = new Auth();
const JSON = require('circular-json');

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
		console.log('User Profile: ', this.props);

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
										<ReactCountryFlag code="gb" svg /> EN
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											<ReactCountryFlag code="gb" svg /> English
										</DropdownItem>
										<DropdownItem>
											<ReactCountryFlag code="de" svg /> Deutsch
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
								<UncontrolledDropdown nav inNavbar className="pr-1">
									<DropdownToggle nav>
										<img src={userProfile.picture ? userProfile.picture : avtarImg } alt="logged-in-user" className="rounded-circle width-35 height-35" />
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											<span className="font-small-3">{userProfile.name ? 'userProfile.name' : 'Telmo Dias'}</span>
										</DropdownItem>
										<DropdownItem divider />
										<Link to="/pages/user-profile" className="p-0">
											<DropdownItem>
												<User size={16} className="mr-1" /> My Profile
											</DropdownItem>
										</Link>
										<Link to="/pages/lockscreen" className="p-0">
											<DropdownItem>
												<Lock size={16} className="mr-1" /> Lock Screen
											</DropdownItem>
										</Link>
										<DropdownItem divider />
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
