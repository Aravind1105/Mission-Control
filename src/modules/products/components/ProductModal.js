import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import $ from 'jquery';
import {
    Button, Form, Select, Message
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Formik, FieldArray, Field } from 'formik';
import { path } from 'ramda';
import * as Yup from 'yup';
import { addProductsSaga, loadFamilyAndTaxSaga } from '../actions';
import { isBoolean } from 'util';


// {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}


const ProductModal = ({
    loadFamilyAndTax, addProduct, history, open, title, family, tax
}) => {
    useEffect(() => {
        const loadData = loadFamilyAndTax();
        console.log(loadData);
    }, []);
    var familyList = [];
    family.forEach(function (element) {
        familyList.push({ key: element._id, text: element.name, value: element._id })
    });
    console.log(familyList);

    var taxList = [];
    tax.forEach(function (element) {
        taxList.push({ key: element._id, text: element.taxValue, value: element._id })
    });
    console.log(taxList);
    var fam_value;
    var handleChange_family = (e, { value }) => {
        fam_value = value;
    }
    var tax_value;
    var handleChange_tax = (e, { value }) => {
        tax_value = value;
    }
    var prod_des = "";
    var handleChange_prod_des = (e, { value }) => {
        prod_des = value;
    }
    var ingred_list = "";
    var handleChange_ingred_list = (e, { value }) => {
        ingred_list = value;
    }
    var allergens_list = "";
    var handleChange_allergens = (e, { value }) => {
        allergens_list = value;
    }
    var type;
    var handleChange_type = (e, { value }) => {
        type = value;
    }
    // var vegetarian_list = false;
    // var handleChange_vegetarian = (e, { value }) => {
    //     vegetarian_list = value;
    // }
    // var vegan_list = false;
    // var handleChange_vegan = (e, { value }) => {
    //     vegan_list = value;
    // }
    return (
        <div></div>
        // <Modal
        //     dialogClassName="prod-modal"
        //     show={open}
        //     centered={false}
        //     onHide={() => {
        //         history.push('/products');
        //     }}
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title id='ModalHeader'>{title}</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <Formik
        //             initialValues={{
        //                 glutenFree: false,
        //                 vegetarian: false,
        //                 vegan: false,
        //                 images: [],
        //                 manufacturer: "",
        //                 family: "",
        //                 category: "",
        //                 name: "",
        //                 description: "",
        //                 defaultPrice: null,
        //                 energy: "",
        //                 fat: "",
        //                 fatSaturated: "",
        //                 carbo: "",
        //                 carboSugar: "",
        //                 fiber: "",
        //                 protein: "",
        //                 salt: "",
        //                 ingredientsList: "",
        //                 allergens: "",
        //                 tax: "",
        //                 packagingOptions: [
        //                     {
        //                         ean: "",
        //                         description: "",
        //                         unitCount: null,
        //                         shelfLifeDays: null,
        //                         netWeightGrams: null,
        //                         grossWeightGrams: null,
        //                         packageWeightGrams: null,
        //                         tolerancePercentage: null
        //                     }
        //                 ]
        //             }}
        //             onSubmit={(values, { setSubmitting }) => {
        //                 if (type === 'glutenFree') {
        //                     values.glutenFree = true;
        //                     values.vegetarian = false;
        //                     values.vegan = false;
        //                 }
        //                 else if (type === 'vegetarian') {
        //                     values.glutenFree = false;
        //                     values.vegetarian = true;
        //                     values.vegan = false;
        //                 }
        //                 else if (type === 'vegan') {
        //                     values.glutenFree = false;
        //                     values.vegetarian = false;
        //                     values.vegan = true;
        //                 }
        //                 const payload = {
        //                     ...values,
        //                     family: fam_value,
        //                     tax: tax_value,
        //                     description: prod_des,
        //                     ingredientsList: ingred_list,
        //                     allergens: allergens_list
        //                 };
        //                 console.log("HEREEEEE", payload);
        //                 if (payload.family || payload.tax === undefined) {
        //                     var doc = document.getElementById('family-chk');
        //                     doc.className += "text-input error"
        //                 }
        //                 // addProduct(payload);
        //                 // console.log(data);
        //                 alert(JSON.stringify(payload, null, 2));
        //                 setSubmitting(false);
        //                 history.push('/products');
        //             }}
        //             validationSchema={Yup.object().shape({
        //                 name: Yup.string().required('Required'),
        //                 manufacturer: Yup.string().required('Required'),
        //                 category: Yup.string().required('Required'),
        //                 // family: Yup.string().required('Family is Required'),
        //                 // description: Yup.string().required('Required'),
        //                 defaultPrice: Yup.number().required('Required'),
        //                 // tax: Yup.string().required('Required'),
        //                 packagingOptions: Yup.array().of(
        //                     Yup.object().shape({
        //                         ean: Yup.string().required('Required'),
        //                         description: Yup.string().required('Required'),
        //                         unitCount: Yup.number().required('Required'),
        //                         shelfLifeDays: Yup.number().required('Required'),
        //                         netWeightGrams: Yup.number().required('Required'),
        //                         grossWeightGrams: Yup.number().required('Required'),
        //                         packageWeightGrams: Yup.number().required('Required'),
        //                         tolerancePercentage: Yup.number().required('Required'),
        //                     }),
        //                 ),
        //             })}
        //         >
        //             {(props) => {
        //                 const {
        //                     values, touched, errors, isSubmitting, handleSubmit
        //                 } = props;
        //                 return (
        //                     <Form onSubmit={handleSubmit} error={!!errors}>
        //                         {/* <Message
        //                             error
        //                             header='Action Forbidden'
        //                             content="Please enter all the red marked fields"
        //                         /> */}
        //                         <Form.Field
        //                             control={Field}
        //                             name="name"
        //                             label="Name"
        //                             placeholder="Name"
        //                             type="text"
        //                             className={
        //                                 path(['name'], errors) && path(['name'], touched)
        //                                     ? 'text-input error'
        //                                     : 'text-input'
        //                             }
        //                             required
        //                         />
        //                         <Form.Group widths="equal">
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="manufacturer"
        //                                 label="Manufacturer"
        //                                 placeholder="e.g. Mission More"
        //                                 type="text"
        //                                 className={
        //                                     path(['manufacturer'], errors) && path(['manufacturer'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />

        //                             <Form.Field
        //                                 control={Field}
        //                                 name="category"
        //                                 label="Category"
        //                                 placeholder="e.g. Snack"
        //                                 className={
        //                                     path(['category'], errors) && path(['category'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="images[0]"
        //                                 label="Image-Url"
        //                                 placeholder="e.g. https://storage.googleapis.com/livello-public/img/organizations/livello.png"
        //                                 type="text"
        //                                 className={
        //                                     path(['images', 0], errors) && path(['images', 0], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                             />


        //                         </Form.Group>

        //                         <Form.Group widths="equal">
        //                             <Form.Field
        //                                 control={Select}
        //                                 name="type"
        //                                 label="Type"
        //                                 onChange={handleChange_type}
        //                                 options={[
        //                                     {
        //                                         key: '0',
        //                                         text: 'Gluten Free',
        //                                         value: 'glutenFree',
        //                                     },
        //                                     {
        //                                         key: '1',
        //                                         text: 'Vegetarian',
        //                                         value: 'vegetarian',
        //                                     },
        //                                     {
        //                                         key: '2',
        //                                         text: 'Vegan',
        //                                         value: 'vegan',
        //                                     },
        //                                     {
        //                                         key: '3',
        //                                         text: 'Other',
        //                                         value: 'other',
        //                                     }
        //                                 ]}
        //                             />
        //                             <Form.Field
        //                                 control={Select}
        //                                 className="family-chk"
        //                                 name="family"
        //                                 label="Family"
        //                                 onChange={handleChange_family}
        //                                 options={familyList}
        //                                 // {...family.map((fam) => {
        //                                 //     <option value={fam._id}>{fam.name}</option>
        //                                 // })}
        //                                 className={
        //                                     path(['family'], errors) && path(['family'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="defaultPrice"
        //                                 label="Default Price"
        //                                 placeholder="e.g. 2.00"
        //                                 type="number"
        //                                 className={
        //                                     path(['defaultPrice'], errors) && path(['defaultPrice'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />

        //                             <Form.Field
        //                                 control={Select}
        //                                 name="tax"
        //                                 label="Tax"
        //                                 options={taxList}
        //                                 onChange={handleChange_tax}
        //                                 className={
        //                                     path(['tax'], errors) && path(['tax'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                         </Form.Group>
        //                         <Form.Group widths="equal">
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="energy"
        //                                 label="Energy"
        //                                 placeholder="e.g. 1659/395"
        //                                 type="text"

        //                             />

        //                             <Form.Field
        //                                 control={Field}
        //                                 name="fat"
        //                                 label="Fat"
        //                                 placeholder="e.g. 19"

        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="fatSaturated"
        //                                 label="Fat Saturated"
        //                                 placeholder="e.g. 2,9"
        //                                 type="text"

        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="carbo"
        //                                 label="Carbo"
        //                                 placeholder="e.g. 47"
        //                                 type="text"

        //                             />

        //                             <Form.Field
        //                                 control={Field}
        //                                 name="carboSugar"
        //                                 label="Carbo Sugar"
        //                                 placeholder="e.g. 38"

        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="fiber"
        //                                 label="Fiber"
        //                                 placeholder="e.g. 5,8"
        //                                 type="text"

        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="protein"
        //                                 label="Protein"
        //                                 placeholder="e.g. 9"
        //                                 type="text"

        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="salt"
        //                                 label="Salt"
        //                                 placeholder="e.g. 0,04"
        //                                 type="text"
        //                             />
        //                         </Form.Group>

        //                         <Form.Group widths="equal">
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].ean"
        //                                 label="EAN"
        //                                 placeholder="e.g. 4260453710284"
        //                                 type="text"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'ean'], errors) && path(['packagingOptions', 0, 'ean'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />

        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].description"
        //                                 label="Package Description"
        //                                 placeholder="e.g. 1 pc"
        //                                 type="text"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'description'], errors) && path(['packagingOptions', 0, 'description'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                         </Form.Group>
        //                         <Form.Group widths="equal">
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].unitCount"
        //                                 label="Unit Count"
        //                                 placeholder="e.g. 1"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'unitCount'], errors) && path(['packagingOptions', 0, 'unitCount'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].shelfLifeDays"
        //                                 label="Shelf Life Days"
        //                                 placeholder="e.g. 240"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'shelfLifeDays'], errors) && path(['packagingOptions', 0, 'shelfLifeDays'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].tolerancePercentage"
        //                                 label="Tolerance Percentage"
        //                                 placeholder="e.g. 0.12"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'tolerancePercentage'], errors) && path(['packagingOptions', 0, 'tolerancePercentage'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].netWeightGrams"
        //                                 label="Net Weight Grams"
        //                                 placeholder="e.g. 48"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'netWeightGrams'], errors) && path(['packagingOptions', 0, 'netWeightGrams'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />

        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].grossWeightGrams"
        //                                 label="Gross Weight in package"
        //                                 placeholder="e.g. 50"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'grossWeightGrams'], errors) && path(['packagingOptions', 0, 'grossWeightGrams'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />
        //                             <Form.Field
        //                                 control={Field}
        //                                 name="packagingOptions[0].packageWeightGrams"
        //                                 label="Package Weight Grams"
        //                                 placeholder="e.g. 20"
        //                                 type="number"
        //                                 className={
        //                                     path(['packagingOptions', 0, 'packageWeightGrams'], errors) && path(['packagingOptions', 0, 'packageWeightGrams'], touched)
        //                                         ? 'text-input error'
        //                                         : 'text-input'
        //                                 }
        //                                 required
        //                             />

        //                         </Form.Group>
        //                         <Form.TextArea
        //                             // control={TextArea}
        //                             name="description"
        //                             label="Product Description"
        //                             placeholder="e.g. 6 Snack Balls"
        //                             style={{ minHeight: 100 }}
        //                             // value={prod_des}
        //                             onChange={handleChange_prod_des}
        //                             className={
        //                                 path(['description'], errors) && path(['description'], touched)
        //                                     ? 'text-input error'
        //                                     : 'text-input'
        //                             }
        //                             required />
        //                         <Form.Group widths="equal">
        //                             <Form.TextArea
        //                                 name="ingredientsList"
        //                                 placeholder="e.g. Datteln (40,7%), Cashewbutter (19,8%)"
        //                                 label="Ingredients List"
        //                                 onChange={handleChange_ingred_list}
        //                                 style={{ minHeight: 100 }}
        //                             />
        //                             <Form.TextArea
        //                                 name="allergens"
        //                                 label="Allergens"
        //                                 placeholder="e.g."
        //                                 style={{ minHeight: 100 }}
        //                                 onChange={handleChange_allergens}
        //                             />
        //                         </Form.Group>
        //                         <Button
        //                             basic
        //                             color="green"
        //                             fluid
        //                             style={{ marginTop: '50px' }}
        //                             type="submit"
        //                             disabled={isSubmitting}
        //                         >
        //                             Add Product
        //       </Button>
        //                     </Form>
        //                 );
        //             }}
        //         </Formik>
        //     </Modal.Body>
        // </Modal>

    );
}

ProductModal.propTypes = {
    addProduct: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    history: ReactRouterPropTypes.history.isRequired,
};

ProductModal.defaultProps = {
    title: 'Products Modal',
};
const mapStateToProps = state => ({
    // products: state.products.product,
    family: state.products.family,
    tax: state.products.tax
});
const mapDispatchToProps = dispatch => ({
    addProduct: product => dispatch(addProductsSaga(product)),
    loadFamilyAndTax: () => dispatch(loadFamilyAndTaxSaga())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ProductModal),
);
