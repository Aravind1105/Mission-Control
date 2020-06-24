import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button, Header, Divider } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import prettierNumber from 'lib/prettierNumber';
import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormTextArea from 'modules/shared/components/FormTextArea';
import { modifyProductSaga } from '../actions';

const ProductForm = ({
  initialValues,
  familyOption,
  categoryOption,
  taxesOption,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    dispatch(modifyProductSaga({ values, formActions, initialValues }));
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ dirty, handleSubmit, values }) => {
        const netPrice = Math.round(
          ((+(values.defaultPrice.replace(',', '.')) || 0) / (1 + (values.tax || 0) / 100)) * 100,
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
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="packagingOptions[0].ean"
                    label="EAN"
                    required
                    component={FormInput}
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
                    required
                    rows={5}
                    component={FormTextArea}
                  />
                </Grid.Column>
                <Grid.Column>
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
                </Grid.Column>
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
                    required
                    component={FormInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5}>
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
                <Grid.Column width={5}>
                  <Field
                    label="Netto - Selling - price"
                    icon="euro"
                    iconPosition="left"
                    className="not-active-input"
                    value={netPrice.toFixed(2)}
                    component={FormInput}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Field
                    name="tax"
                    label="VAT (%)"
                    required
                    component={FormSelect}
                    options={taxesOption}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="packagingOptions[0].description"
                    label="Packaging description"
                    required
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
                  {/* TODO: After Data for this field will provided, remove "disabled" prop */}
                  <Field
                    name="tag"
                    label="Tags"
                    required
                    disabled
                    component={FormSelect}
                    options={[]}
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
                  <Button>Cancel</Button>
                  <Button color="green" type="submit" disabled={!dirty}>
                    Submit
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
