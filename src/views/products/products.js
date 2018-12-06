import React, { PureComponent } from "react";
//import { Card, CardHeader, CardTitle, Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import Link from "redux-first-router-link"

import { Table, Input, Modal, ModalHeader, Form } from "reactstrap";
import { Edit, Trash2, Search } from "react-feather";
import * as Icon from "react-feather";

import AddProduct from "../../containers/products/addProduct";
import salad from "../../assets/img/photos/salad.jpg";
import sandwich from "../../assets/img/photos/sandwich.jpg";
import smoothie from "../../assets/img/photos/smoothie.jpg";


class Products extends PureComponent {

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
                            <Input className="form-control round" placeholder="Search products" type="text" />
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
                  <Icon.Plus size={18} className="mr-1" /> New Product
               </button> 
            </div>
            <div>    
               <Table responsive>
                  <thead>
                     <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th scope="row">
                           <img
                              src={salad}
                              alt="salad"
                              className="img-fluid width-50"
                           />
                        </th>
                        <td>Salad</td>
                        <td>$15</td>
                        <td><Input type="number" name="number" id="exampleNumber" value="2" className="width-100"/></td>
                        <td>$30</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>                     
                     <tr>
                        <th scope="row">
                           <img
                              src={sandwich}
                              alt="sandwich"
                              className="img-fluid width-50"
                           />
                        </th>
                        <td>Sanwich</td>
                        <td>$5</td>
                        <td><Input type="number" name="number4" id="exampleNumber4" value="10" className="width-100"/></td>
                        <td>$50</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>
                     <tr>
                     <th scope="row">
                           <img
                              src={smoothie}
                              alt="smoothie"
                              className="img-fluid width-50"
                           />
                        </th>
                        <td>Smoothie</td>
                        <td>$3</td>
                        <td><Input type="number" name="number5" id="exampleNumber5" value="5" className="width-100"/></td>
                        <td>$15</td>
                        <td>
                           <Edit size={18} className="mr-2" />{" "}
                           <Trash2 size={18} color="#FF586B" />
                        </td>
                     </tr>
                  </tbody>
               </Table>
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="md">
               <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
               <AddProduct />
            </Modal>
         </div>   
       );
   }
}

Products.propTypes = {
   cardTitle: PropTypes.string,
   productsData: PropTypes.object
};

export default Products;
