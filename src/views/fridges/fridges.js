import React, { PureComponent } from "react";
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
               <Table responsive>
                  <thead>
                     <tr>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Serial No.</th>
                        <th>Last Modified</th>  
                        <th>Actions</th>                        
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Kaisstr. 5, Dusseldorf, Germany</td>
                        <td>
                           <button 
                              type="button"                  
                              className="btn btn-sm btn-round btn-success" 
                           >Active</button>
                        </td>
                        <td>ABC123D</td>
                        <td>1 week ago</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>
                     <tr>                        
                        <td>Church st. 1, Dusseldorf, Germany</td>
                        <td>
                           <button 
                              type="button"                  
                              className="btn btn-sm btn-round color-yellow" 
                           >Maintenance</button>
                        </td>
                        <td>PQR1111S</td>
                        <td>1 month ago</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>  
                     <tr>
                        <td>Main st. 12, Dusseldorf, Germany</td>
                        <td>
                           <button 
                              type="button"                  
                              className="btn btn-sm btn-round btn-success" 
                           >Active</button>
                        </td>
                        <td>XYZ1234</td>
                        <td>2 weeks ago</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>                   
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

/*Fridges.propTypes = {
   cardTitle: PropTypes.string,
   fridgesData: PropTypes.object
};*/

export default Fridges;
