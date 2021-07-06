import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Form,
  Button,
  Header,
  Divider,
  Popup,
  Icon,
} from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import prettierNumber from 'lib/prettierNumber';
import FormInput from 'modules/shared/components/FormInput';
import FormInputWithSelector from 'modules/shared/components/FormInputWithSelector';
import FormSelect from 'modules/shared/components/FormSelect';
import FormTextArea from 'modules/shared/components/FormTextArea';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';
import { modifyProductSaga } from '../actions';
import get from 'lodash/get';
import { isEqual } from 'lodash';

let updatingProduct = false;
const ProductForm = ({
  initialValues,
  taxesOption,
  organizations,
  setIsCancelTriggered,
  buttonVal,
  isProductLoading,
  firstUploadImage,
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
    values.packagingOptions[0].ean == ''
      ? (values.packagingOptions[0].ean = 'Optional field not used.')
      : values.packagingOptions[0].ean;

    // description is mandatory in the backend and so filling it up with empty string
    values.packagingOptions[0].description == ''
      ? (values.packagingOptions[0].description = 'Optional field not used.')
      : values.packagingOptions[0].description;

    //convert capacities field to Livello BE expected format
    const { capacities } = values;
    const newCapacities = [];
    newCapacities.push({
      surfaceSize: 'N33',
      units: parseInt(get(capacities, 'surfaceSize_33', '0')),
    });
    newCapacities.push({
      surfaceSize: 'N50',
      units: parseInt(get(capacities, 'surfaceSize_50', '0')),
    });
    newCapacities.push({
      surfaceSize: 'N100',
      units: parseInt(get(capacities, 'surfaceSize_100', '0')),
    });
    values.capacities = newCapacities;

    // firstUploadImage is null by default. On creating product, if image is uploaded then firstUploadImage will have a base64 string of the image and hence it will be considered for the update
    updatingProduct = dispatch(
      modifyProductSaga({
        values,
        formActions,
        initialValues,
        uploadedImage: firstUploadImage,
      }),
    );
  };

  const handleCancel = resetForm => {
    resetForm();
    setIsCancelTriggered(true);
    setIsImageDeleted(false);
    history.push('/products');
  };

  // In order to provide a faster filling out of the add products form,
  // the shelf max capacity fields should be filled out automatically once one of them gets filled out by the customer ONLY FOR THE FIRST TIME
  // User should be able to change the populated fields
  const [isFirstShelfSizeChange, setIsFirstShelfSizeChange] = useState(true);
  const handleShelfSizeChange = (form, field, value) => {
    if (isFirstShelfSizeChange) {
      if (isEqual(field, 'capacities.surfaceSize_100')) {
        form.setFieldValue('capacities.surfaceSize_50', Math.floor(value / 2));
        form.setFieldValue('capacities.surfaceSize_33', Math.floor(value / 3));
      } else if (isEqual(field, 'capacities.surfaceSize_50')) {
        const max = value * 2;
        form.setFieldValue('capacities.surfaceSize_100', Math.floor(max));
        form.setFieldValue('capacities.surfaceSize_33', Math.floor(max / 3));
      } else if (isEqual(field, 'capacities.surfaceSize_33')) {
        const max = value * 3;
        form.setFieldValue('capacities.surfaceSize_100', Math.floor(max));
        form.setFieldValue('capacities.surfaceSize_50', Math.floor(max / 2));
      }
      setIsFirstShelfSizeChange(false);
    }
  };

  useEffect(() => {
    if (updatingProduct) {
      if (isProductLoading) {
        // toast({description:'Product is being changed.', animation:'fade left', icon:'exclamation', color: 'orange'});
      } else {
        toast({
          type: 'success',
          description: 'Product was saved successfully.',
          animation: 'fade left',
        });
        updatingProduct = false;
        history.push('/products');
      }
    }
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required('This field is required'),
        orgId: Yup.string().required('This field is required'),
        tax: Yup.string().required('This field is required'),
        manufacturer: Yup.string().required('This field is required'),
        packagingOptions: Yup.array().of(
          Yup.object().shape({
            // netWeightGrams: Yup.number().required('This field is required'),
            shelfLifeDays: Yup.number().required('This field is required'),
            grossWeightGrams: Yup.number().required('This field is required'),
          }),
        ),
        defaultPrice: Yup.string().required('This field is required'),
        defaultCost: Yup.string().required('This field is required'),
        capacities: Yup.object().shape({
          surfaceSize_100: Yup.number().required('This field is required'),
          surfaceSize_50: Yup.number().required('This field is required'),
          surfaceSize_33: Yup.number().required('This field is required'),
        }),
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
                    placeholder="max. 50 characters"
                    maxLength="50"
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
                    placeholder="ex:1234567890123"
                    maxLength="13"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="articleNumber"
                    label="Article Number (SKU)"
                    component={FormInput}
                    placeholder="ex:V172712312"
                    maxLength="20"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="manufacturer"
                    label="Manufacturer"
                    required
                    placeholder="max. 50 characters"
                    maxLength="50"
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Field
                    name="description"
                    label="Description"
                    rows={5}
                    component={FormTextArea}
                    placeholder="Enter a product description."
                    maxLength="200"
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
            </Grid>
            <Grid>
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Field
                    name="packagingOptions[0].netWeightGrams"
                    label="Net Quantity (ml/g)"
                    min={0}
                    maxLength="5"
                    component={FormInputWithSelector}
                    limiting="integerField"
                    selectorOptions={[
                      { key: 'ml', text: 'ml', value: 'ml' },
                      { key: 'g', text: 'g', value: 'g' },
                    ]}
                    selectorDefaultValueIndex={1}
                    dropdownSelectedValue={
                      values.packagingOptions[0].netWeightGramsUnit || 'g'
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="packagingOptions[0].grossWeightGrams"
                    label="Actual Weight (g)"
                    min={0}
                    required
                    maxLength="5"
                    component={FormInput}
                    limiting="integerField"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="packagingOptions[0].shelfLifeDays"
                    label="Shelf life (days)"
                    limiting="integerField"
                    required
                    min={0}
                    maxLength="3"
                    placeholder="optional"
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
                    maxLength="6"
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
                    maxLength="6"
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
                    maxLength="6"
                    min={0}
                  />
                </Grid.Column>
              </Grid.Row>

              {/* <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="packagingOptions[0].description"
                    label="Packaging description"
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row> */}
            </Grid>

            <div style={{ marginTop: 25 }}>
              <span className="product-field-custom-h5">
                Shelf Max. Capacity
              </span>
              <Popup trigger={<Icon name="info circle" color="yellow" />}>
                <Popup.Content>
                  <img
                    src={require('../../../styling/assets/images/shelf_capacities.png')}
                    style={{
                      height: 150,
                      width: 330,
                    }}
                  />
                </Popup.Content>
              </Popup>
            </div>
            <Divider />
            <Grid>
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Field
                    name="capacities.surfaceSize_100"
                    label="Full Shelf (L)"
                    min={0}
                    required
                    maxLength="3"
                    component={FormInput}
                    limiting="integerField"
                    callbackOnBlur={handleShelfSizeChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="capacities.surfaceSize_50"
                    label="1/2 Shelf (M)"
                    min={0}
                    required
                    maxLength="3"
                    component={FormInput}
                    limiting="integerField"
                    callbackOnBlur={handleShelfSizeChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="capacities.surfaceSize_33"
                    label="1/3 Shelf (S)"
                    min={0}
                    required
                    maxLength="3"
                    component={FormInput}
                    limiting="integerField"
                    callbackOnBlur={handleShelfSizeChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Header as="h4">Nutrition Facts (per 100g)</Header>
            <Divider />

            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="energy"
                    label="kJ/kcal"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="fat"
                    label="Total Fat (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="fatSaturated"
                    label="Saturated Fats (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="carbo"
                    label="Carbohydrates (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="carboSugar"
                    label="Sugar (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                  <Field
                    name="fiber"
                    label="Fiber (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field
                    name="protein"
                    label="Protein (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field
                    name="salt"
                    label="Salt (g)"
                    component={FormInput}
                    limiting="floatingField"
                    maxLength="5"
                    min={0}
                  />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Field
                    name="allergens"
                    label="Allergens"
                    component={FormInput}
                    maxLength="100"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="ingredientsList"
                    label="Ingredients"
                    rows={5}
                    maxLength="400"
                    component={FormTextArea}
                    placeholder="Enter the ingredients of the product here."
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
                  <Button color="green" type="submit" disabled={!dirty}>
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
