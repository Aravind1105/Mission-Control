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
import { isEqual } from 'lodash';
import * as Yup from 'yup';

import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormInputWithUnit from 'modules/shared/components/FormInputWithUnit';

import { modifyProductSaga } from '../actions';

const ProductForm = ({
  initialValues,
  taxesOption,
  organizations,
  cancelHandler,
  buttonVal,
  firstUploadImage,
}) => {
  const dispatch = useDispatch();

  // Modifier for Package Options for Livello BE expected format
  const packagingOptionModifier = values => {
    values.packagingOptions = [
      {
        ean: values.packagingOptionsEan,
        unitCount: values.packagingOptionsUnitCount,
        grossWeightGrams: parseInt(values.packagingOptionsGrossWeightGrams),
        packageWeightGrams: parseInt(values.packagingOptionsPackageWeightGrams),
        netWeightGramsUnit: values.packagingOptionsNetWeightGrams.unit,
        netWeightGrams: parseInt(values.packagingOptionsNetWeightGrams.value),
        shelfLifeDays: parseInt(values.packagingOptionsShelfLifeDays),
        tolerancePercentage: values.packagingOptionsTolerancePercentage,
        description: values.packagingOptionsDescription,
      },
    ];
    // Deleting Custom Properties
    delete values.packagingOptionsGrossWeightGrams;
    delete values.packagingOptionsEan;
    delete values.packagingOptionsShelfLifeDays;
    delete values.packagingOptionsTolerancePercentage;
    delete values.packagingOptionsDescription;
    delete values.packagingOptionsNetWeightGrams;
    delete values.packagingOptionsUnitCount;
    delete values.packagingOptionsPackageWeightGrams;
    delete values.packagingOptionsPackageWeightGramsUnit;
    delete values.packagingOptionsNetWeightGramsUnit;
    return values;
  };

  // Modifier for Capacity Options for Livello BE expected format
  const capacityModifier = values => {
    const newCapacities = [];
    newCapacities.push({
      surfaceSize: 'N33',
      units: parseInt(values.capacitiesSurfaceSize_33),
    });
    newCapacities.push({
      surfaceSize: 'N50',
      units: parseInt(values.capacitiesSurfaceSize_50),
    });
    newCapacities.push({
      surfaceSize: 'N100',
      units: parseInt(values.capacitiesSurfaceSize_100),
    });
    delete values.capacitiesSurfaceSize_33;
    delete values.capacitiesSurfaceSize_50;
    delete values.capacitiesSurfaceSize_100;
    values.capacities = newCapacities;
    return values;
  };

  const onSubmit = (values, formActions) => {
    packagingOptionModifier(values);
    values.packagingOptions[0].netWeightGrams = +values.packagingOptions[0]
      .netWeightGrams;
    values.packagingOptions[0].grossWeightGrams = +values.packagingOptions[0]
      .grossWeightGrams;
    values.packagingOptions[0].shelfLifeDays = +values.packagingOptions[0]
      .shelfLifeDays;
    // CRITICAL
    values.packagingOptions[0].description = 'Optional field not used.';
    values.packagingOptions[0].ean == ''
      ? (values.packagingOptions[0].ean = 'Optional field not used.')
      : values.packagingOptions[0].ean;

    delete values.image;

    //convert capacities field to Livello BE expected format
    capacityModifier(values);

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

  // In order to provide a faster filling out of the add products form,
  // the shelf max capacity fields should be filled out automatically once one of them gets filled out by the customer ONLY FOR THE FIRST TIME
  // User should be able to change the populated fields
  const [isFirstShelfSizeChange, setIsFirstShelfSizeChange] = useState(true);
  const handleShelfSizeChange = (form, field, value) => {
    if (isFirstShelfSizeChange) {
      if (isEqual(field, 'capacitiesSurfaceSize_100')) {
        form.setFieldValue('capacitiesSurfaceSize_50', Math.floor(value / 2));
        form.setFieldValue('capacitiesSurfaceSize_33', Math.floor(value / 3));
      } else if (isEqual(field, 'capacitiesSurfaceSize_50')) {
        const max = value * 2;
        form.setFieldValue('capacitiesSurfaceSize_100', Math.floor(max));
        form.setFieldValue('capacitiesSurfaceSize_33', Math.floor(max / 3));
      } else if (isEqual(field, 'capacitiesSurfaceSize_33')) {
        const max = value * 3;
        form.setFieldValue('capacitiesSurfaceSize_100', Math.floor(max));
        form.setFieldValue('capacitiesSurfaceSize_50', Math.floor(max / 2));
      }
      setIsFirstShelfSizeChange(false);
    }
  };

  return (
    <>
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
          packagingOptionsShelfLifeDays: Yup.string().required(
            'This field is required',
          ),
          packagingOptionsGrossWeightGrams: Yup.string().required(
            'This field is required',
          ),
          packagingOptionsNetWeightGrams: Yup.object({
            value: Yup.number().required('This field is required'),
            unit: Yup.string().required('This field is required'),
          }),
          capacitiesSurfaceSize_33: Yup.number().required(
            'This field is required',
          ),
          capacitiesSurfaceSize_50: Yup.number().required(
            'This field is required',
          ),
          capacitiesSurfaceSize_100: Yup.number().required(
            'This field is required',
          ),
          defaultPrice: Yup.string().required('This field is required'),
          defaultCost: Yup.string().required('This field is required'),
        })}
        enableReinitialize
      >
        {({ dirty, handleSubmit, values, setValues, resetForm, errors }) => {
          const netPrice =
            Math.round(
              ((+values.defaultPrice.replace(',', '.') || 0) /
                (1 + (values.tax || 0) / 100)) *
                100,
            ) / 100;
          return (
            <Form onSubmit={handleSubmit} noValidate>
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
                      name="packagingOptionsEan"
                      label="EAN"
                      component={FormInput}
                      placeholder="ex:1234567890123"
                      maxLength="13"
                      limiting="integerField"
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
                      name="packagingOptionsNetWeightGrams"
                      label="Net Quantity (ml/g)"
                      min={0}
                      maxLength="5"
                      component={FormInputWithUnit}
                      limiting="integerField"
                      required
                      unitOptions={[
                        { key: 'ml', text: 'ml', value: 'ml' },
                        { key: 'g', text: 'g', value: 'g' },
                      ]}
                      defaultUnitIndex={1}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field
                      name="packagingOptionsGrossWeightGrams"
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
                      name="packagingOptionsShelfLifeDays"
                      label="Shelf life (days)"
                      limiting="integerField"
                      required
                      min={0}
                      maxLength="3"
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
                      iconPosition="right"
                      min={0}
                      required
                      component={FormInput}
                      limiting="floatingField"
                      maxLength="6"
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      label="Netto - Selling - price"
                      icon="euro"
                      iconPosition="right"
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
                      iconPosition="right"
                      component={FormInput}
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
                      name="capacitiesSurfaceSize_100"
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
                      name="capacitiesSurfaceSize_50"
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
                      name="capacitiesSurfaceSize_33"
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
                      onClick={() => cancelHandler({ resetForm, dirty })}
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
    </>
  );
};

export default ProductForm;
