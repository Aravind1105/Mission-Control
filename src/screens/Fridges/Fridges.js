import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

//import { Card, CardHeader, CardTitle, Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import Link from "redux-first-router-link"

import { Table, Input, Modal, ModalHeader, Form } from "reactstrap";
import { Edit, Trash2, Search } from "react-feather";
import * as Icon from "react-feather";

import AddFridge from "../../containers/fridges/addFridge";

class Fridges extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	};

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	};


	render() {
		const fridgesList = this.props.fridges.fridgeList;
		console.log('dataaaaaaaaaaaaaaaaa',typeof fridgesList, fridgesList)
		return (
			<div>
				<div className="form-group form-group-compose text-left">
					 <div>
						  <Form className="float-left" role="search">
								<div className="position-relative has-icon-right">
									 <Input className="form-control round" placeholder="Search fridges" type="text" />
										  <div className="form-control-position">
												<Search size={16} className="mb-0" />
										  </div>
								</div>
						  </Form>
					 </div>
					<button
						type="button"
						className="btn btn-danger float-right my-2 shadow-z-2"
						onClick={this.toggle}
					>
						<Icon.Plus size={18} className="mr-1" /> New Fridge
					</button>
				</div>
				<div>
					<Table hover>
						<thead >
							<tr>
								<th>Name</th>
								<th>Status</th>
								<th>Serial No.</th>
								<th>Address</th>
								<th>Sales 24h</th>
								<th>Stock</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{fridgesList.hasOwnProperty('length') && fridgesList.length > 0 && fridgesList.map((object, i) => {
								return (
									<tr key={i}>
										<td>{object.name}</td>
										<td>{object.state}</td>
										<td>{object.serialNumber}</td>
										<td>{object.location}</td>
										<td>NA</td>
										<td>NA</td>
										<td>
											<Edit size={18} className="mr-2" />{" "}
											<Trash2 size={18} color="#FF586B" />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="md">
					<ModalHeader toggle={this.toggle}>Add Fridge</ModalHeader>
					<AddFridge />
				</Modal>
			</div>
		 );
	}
}

Fridges.propTypes = {
	fridgesData: PropTypes.object
};

const mapStateToProps = (state) => {
	return state
};

const mapDispatchToProps = (dispatch) => {
	return ({
		dispatch,
		someMethod: () => {

		}
	});
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Fridges));
