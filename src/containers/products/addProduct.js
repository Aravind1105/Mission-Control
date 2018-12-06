import React from "react";
import { Col, Row, Form, FormGroup, Label, Button, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addProduct } from "../../actions/products";
import backgroundImg from "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg"

const mapStateToProps = state => ({
   id: state.contactsReducer.contacts.length
});

const AddProduct = ({ id, dispatch }) => {
   let name, price, quantity;

   return (
      <React.Fragment>
         <Form
            onSubmit={e => {
               e.preventDefault();
               if (!name.value.trim()) {
                  return;
               }
               dispatch(
                  addProduct(
                     id,
                     name.value,
                     price.value,
                     quantity.value                                         
                  )
               );
               name.value = "";
               price.value = "";
               quantity.value = "";
            }}
         >
            <ModalBody>
               <Row>
                  <Col md={6}>
                     <img
                        src={backgroundImg}
                        className="rounded-circle width-100 height-100"
                        alt={id}
                     />
                  </Col>
                  <Col md={6}>
                     <FormGroup>
                        <Label for="name">Product Name</Label>
                        <input
                           className="form-control"
                           type="text"
                           name="name"
                           id="name"
                           ref={node => (name = node)}
                           required
                        />
                     </FormGroup>
                  </Col>
               </Row>
               <Row>
                  <Col md={6}>                     
                  </Col>
                  <Col md={6}>
                     <FormGroup>
                        <Label for="price">Price</Label>
                        <input
                           className="form-control"
                           type="text"
                           name="price"
                           id="price"
                           ref={node => (price = node)}
                        />
                     </FormGroup>
                  </Col>                  
               </Row>
               <Row>
                  <Col md={6}>                     
                  </Col>
                  <Col md={6}>
                     <FormGroup>
                        <Label for="quantity">Quantity</Label>
                        <input
                           className="form-control"
                           type="quantity"
                           name="quantity"
                           id="quantity"
                           ref={node => (quantity = node)}                           
                        />
                     </FormGroup>
                  </Col>                  
               </Row>
               
            </ModalBody>
            <ModalFooter>
               <Button color="primary" type="submit">
                  Add Product
               </Button>
            </ModalFooter>
         </Form>
      </React.Fragment>
   );
};

export default connect(mapStateToProps)(AddProduct);
