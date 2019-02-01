import React, { PureComponent } from "react";
//import { Card, CardHeader, CardTitle, Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import Link from "redux-first-router-link"

import { Table, Input, Modal, ModalHeader, Form } from "reactstrap";
import { Edit, Trash2, Search } from "react-feather";
import * as Icon from "react-feather";

import AddOrganization from "../../containers/organizations/addOrganization";

class Organizations extends PureComponent {

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
      const organizationsList = this.props.organizationsData.organizations; 
      console.log('dataaaaaaaaaaaaaaaaa',typeof organizationsList, organizationsList)
      return (
         <div>              
            <div className="form-group form-group-compose text-left">
                <div>
                    <Form className="float-left" role="search">
                        <div className="position-relative has-icon-right">
                            <Input className="form-control round" placeholder="Search organizations" type="text" />
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
                  <Icon.Plus size={18} className="mr-1" /> New Organization
               </button> 
            </div>
            <div>    
               <Table hover>
                  <thead >
                     <tr>
                        <th>Name</th>                        
                        <th>Address</th>                                        
                        <th>Actions</th>      
                     </tr>
                  </thead>
                  <tbody>
                     {organizationsList.hasOwnProperty('length') && organizationsList.length > 0 && organizationsList.map((object, i) => {                        
                        return (
                           <tr key={i}>                              
                              <td>{object.name}</td>                              
                              <td>{object.address}</td> 
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
               <ModalHeader toggle={this.toggle}>Add Organization</ModalHeader>
               <AddOrganization />
            </Modal>
         </div>   
       );
   }
}

Organizations.propTypes = {   
   organizationsData: PropTypes.object
};

export default Organizations;
