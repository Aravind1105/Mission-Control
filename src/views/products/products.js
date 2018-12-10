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
import no_pic from "../../assets/img/photos/no_pic.png";
const JSON = require('circular-json');



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
      console.log('props---------------------------------------->',this.props);
      console.log('props product---------------------------------------->',this.props.productsData.products);
      const productsList = this.props.productsData.products;      
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
                        <th>Price(€)</th>
                        <th>Quantity</th>
                        <th>Total Price(€)</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {productsList.hasOwnProperty('length') && productsList.length > 0 && productsList.map((object, i) => {                        
                        return (
                           <tr key={i}>
                              <td>
                                 <img
                                    src={object.imageUrl ? require("../../assets/img/photos/" + object.imageUrl) : no_pic }
                                    className="media-object round-media height-50"
                                    alt="Card cap 02"
                                 />
                              </td>
                              <td>{object.name}</td>
                              <td>{object.price}</td>                              
                              <td>{object.productItems.totalItems}</td>
                              <td>{object.price * object.productItems.totalItems}</td>
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
               <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
               <AddProduct />
            </Modal>
         </div>   
       );
   }
}

Products.propTypes = {
   productsData: PropTypes.object
};

export default Products;
