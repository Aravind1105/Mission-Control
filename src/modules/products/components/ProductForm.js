import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button, Header, Divider } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import prettierNumber from 'lib/prettierNumber';
import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormTextArea from 'modules/shared/components/FormTextArea';
import { modifyProductSaga } from '../actions';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';

let setImg;
let restVal;
let updatingProduct = false;
const ProductForm = ({
  initialValues,
  // familyOption,
  // categoryOption,
  taxesOption,
  uploadedImage,
  organizations,
  isImageDeleted,
  setIsCancelTriggered,
  setIsImageDeleted,
  buttonVal,
  disableForm,
  isProductLoading,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values, formActions) => {
    values.packagingOptions[0].netWeightGrams = +values.packagingOptions[0]
      .netWeightGrams;
    values.packagingOptions[0].grossWeightGrams = +values.packagingOptions[0]
      .grossWeightGrams;
    values.packagingOptions[0].shelfLifeDays = +values.packagingOptions[0]
      .shelfLifeDays;
    delete values.image;
    setIsCancelTriggered(false);
    setIsImageDeleted(false);
    values.packagingOptions[0].ean == ''
      ? (values.packagingOptions[0].ean = 'Optional field not used.')
      : values.packagingOptions[0].ean;
    values.packagingOptions[0].description == ''
      ? (values.packagingOptions[0].description = 'Optional field not used.')
      : values.packagingOptions[0].description;

    updatingProduct = dispatch(
      modifyProductSaga({
        values,
        formActions,
        initialValues,
        uploadedImage,
        isImageDeleted,
      }),
    );
  };

  const handleCancel = resetForm => {
    resetForm();
    setIsCancelTriggered(true);
    setIsImageDeleted(false);
    history.push('/products')
  };

  useEffect(() => {
    if(updatingProduct){
      if(!initialValues.id){
        if(isProductLoading){
          toast({description:'Product is being created.', animation:'fade left', icon:'exclamation', color: 'orange'});
        }
      }
      else if(initialValues.id){
        if(isProductLoading){
          toast({description:'Product is being changed.', animation:'fade left', icon:'exclamation', color: 'orange'});
        }else{
          toast({type:'success', description:'Product was saved successfully.', animation:'fade left'});
          updatingProduct = false;
          history.push('/products');
        }
      }
    }
  });

  useEffect(() => {
    if (uploadedImage) {
      if (setImg) {
        setIsCancelTriggered(false);
        setImg({ ...restVal, image: restVal.image + 1 }, true);
      }
    } else if (isImageDeleted) {
      if (setImg) {
        setIsCancelTriggered(false);
        setImg({ ...restVal, image: restVal.image + 1 }, true);
      }
    }
  }, [uploadedImage, isImageDeleted]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        orgId: Yup.string().required('This field is required'),
        tax: Yup.string().required('This field is required'),
        // family: Yup.string().required('This field is required'),
        // category: Yup.string().required('This field is required'),
      })}
      enableReinitialize
    >
      {({ dirty, handleSubmit, values, setValues, resetForm }) => {
        const netPrice =
          Math.round(
            ((+values.defaultPrice.replace(',', '.') || 0) /
              (1 + (values.tax || 0) / 100)) *
              100,
          ) / 100;
        setImg = setValues;
        restVal = values;
        return (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="name"
                    label="Name"
                    required
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name="orgId"
                    label="Organization"
                    required
                    component={FormSelect}
                    options={organizations}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="packagingOptions[0].ean"
                    label="EAN"
                    component={FormInput}
                    placeholder="EAN is optional."
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="manufacturer"
                    label="Manufacturer"
                    required
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Field
                    name="description"
                    label="Description"
                    rows={5}
                    component={FormTextArea}
                  />
                </Grid.Column>
                {/* <Grid.Column>
                  <Field
                    name="family"
                    label="Family"
                    required
                    component={FormSelect}
                    options={familyOption}
                  />
                  <Field
                    name="category"
                    label="Category"
                    required
                    component={FormSelect}
                    options={categoryOption[values.family] || []}
                  />
                </Grid.Column> */}
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={5}>
                  <Field
                    name="packagingOptions[0].netWeightGrams"
                    label="Net Quantity (ml/g)"
                    min={0}
                    required
                    component={FormInput}
                    limiting="integerField"
                  />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Field
                    name="packagingOptions[0].grossWeightGrams"
                    label="Actual Weight (g)"
                    min={0}
                    required
                    component={FormInput}
                    limiting="integerField"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    name="packagingOptions[0].shelfLifeDays"
                    label="Shelf life (days)"
                    limiting="integerField"
                    min={0}
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Field
                    name="defaultPrice"
                    label="Price - Selling - Gross"
                    icon="euro"
                    iconPosition="left"
                    min={0}
                    required
                    prettier={prettierNumber}
                    component={FormInput}
                    limiting="floatingField"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    label="Netto - Selling - price"
                    icon="euro"
                    iconPosition="left"
                    className="not-active-input"
                    value={netPrice.toFixed(2)}
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    name="tax"
                    label="VAT (%)"
                    required
                    component={FormSelect}
                    options={taxesOption}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    name="defaultCost"
                    label="Cost"
                    icon="euro"
                    iconPosition="left"
                    component={FormInput}
                    prettier={prettierNumber}
                    limiting="floatingField"
                    required
                    min={0}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="packagingOptions[0].description"
                    label="Packaging description"
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Header as="h4">Nutrition Facts (per 100g)</Header>
            <Divider />

            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field name="energy" label="kJ/kcal" component={FormInput} />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="fat"
                    label="Total Fat (g)"
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="fatSaturated"
                    label="Saturated Fats (g)"
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="carbo"
                    label="Carbohydrates (g)"
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="carboSugar"
                    label="Sugar (g)"
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                  <Field name="fiber" label="Fiber (g)" component={FormInput} />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field
                    name="protein"
                    label="Protein (g)"
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field name="salt" label="Salt (g)" component={FormInput} />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Field
                    name="allergens"
                    label="Allergens"
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="ingredientsList"
                    label="Ingredients"
                    rows={5}
                    component={FormTextArea}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Button
                    disabled={!dirty}
                    onClick={() => handleCancel(resetForm)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="green"
                    type="submit"
                    disabled={!dirty || disableForm}
                  >
                    {buttonVal}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
