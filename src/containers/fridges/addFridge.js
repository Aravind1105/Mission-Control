import React from "react";
import { Col, Row, Form, FormGroup, Label, Button, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addProduct } from "../../actions/products";
import backgroundImg from "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg"

const mapStateToProps = state => ({
   id: state.contactsReducer.contacts.length
});

const AddFridge = ({ id, dispatch }) => {
   let address, status, serialNo, lastModified;

   return (
      <React.Fragment>
         <Form
            onSubmit={e => {
               e.preventDefault();
               if (!address.value.trim()) {
                  return;
               }
               dispatch(
                  addProduct(
                     id,
                     address.value,
                     status.value,
                     serialNo.value,
                     lastModified.value              
                  )
               );
               address.value = "";
               status.value = "";
               serialNo.value = "";
               lastModified.value = "";
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
                        <Label for="address">Fridge Address</Label>
                        <input
                           className="form-control"
                           type="textarea"
                           name="address"
                           id="address"
                           ref={node => (address = node)}
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
                        <Label for="status">Status</Label>
                        <input
                           className="form-control"
                           type="text"
                           name="status"
                           id="status"
                           ref={node => (status = node)}
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
                        <Label for="serialNo">Serial No.</Label>
                        <input
                           className="form-control"
                           type="text"
                           name="serialNo"
                           id="serialNo"
                           ref={node => (serialNo = node)}
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
                        <Label for="lastModified">Last Modified</Label>
                        <input
                           className="form-control"
                           type="lastModified"
                           name="lastModified"
                           id="lastModified"
                           ref={node => (lastModified = node)}                           
                        />
                     </FormGroup>
                  </Col>                  
               </Row>
               
            </ModalBody>
            <ModalFooter>
               <Button color="primary" type="submit">
                  Add Fride
               </Button>
            </ModalFooter>
         </Form>
      </React.Fragment>
   );
};

export default connect(mapStateToProps)(AddFridge);
