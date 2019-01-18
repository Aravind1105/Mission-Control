import React from "react";
import { Col, Row, Form, FormGroup, Label, Button, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { addOrganization } from "../../actions/organizations";
import backgroundImg from "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg"

const mapStateToProps = state => ({
   id: state.organizationsReducer.organizations.length
});

const AddOrganization = ({ id, dispatch }) => {
   let name, address, status, serialNo;

   return (
      <React.Fragment>
         <Form
            onSubmit={e => {
               e.preventDefault();
               if (!address.value.trim()) {
                  return;
               }
               dispatch(
                  addOrganization(
                     name.value,
                     id,
                     address.value,
                     status.value,
                     serialNo.value            
                  )
               );
               name.value="";
               address.value = "";
               status.value = "";
               serialNo.value = "";
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
                        <Label for="name">Name</Label>
                        <input
                           className="form-control"
                           type="text"
                           name="status"
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
                        <Label for="address">Address</Label>
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
                        <input type="select" name="status" id="status" multiple>
                           <option>Active</option>
                           <option>Staged</option>
                           <option>Offline</option>                           
                        </input>
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
            </ModalBody>
            <ModalFooter>
               <Button color="primary" type="submit">
                  Add Organization
               </Button>
            </ModalFooter>
         </Form>
      </React.Fragment>
   );
};

export default connect(mapStateToProps)(AddOrganization);
