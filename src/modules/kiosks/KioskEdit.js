import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import get from 'lodash/get';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
// import { getKioskListName } from 'modules/kiosks/selectors';
import KioskForm from './components/KioskForm';
// import ProductPriceHistory from './components/ProductPriceHistory';
// import { modifyKiosk } from './actions';
// import {
//   selectorGetProductInitValue,
//   selectorGetProductFamilyForm,
//   selectorProductTaxOptions,
// } from './selectors';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Kiosks',
    link: '/kiosks',
  },
];
const backLink = {
  name: 'Back to kiosks',
  link: '/kiosks',
};

const KioskEdit = () => {
  return (
    <Grid stackable>
      <Grid.Column width={11}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Breadcrumbs
                  links={links}
                  backLink={backLink}
                  activeLink="New kiosk"
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Header as="h3">New kiosk</Header>
                <Divider />
                <KioskForm initialValues={{ name: '' }} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

// const mapStateToProps = state => {
//   const options = selectorGetProductFamilyForm(state);
//   return {
//     kiosks: getKioskListName(state),
//     product: selectorGetProductInitValue(state),
//     taxesOption: selectorProductTaxOptions(state),
//     categoryOption: options.categories,
//     familyOption: options.families,
//   };
// };

// const mapDispatchToProps = {
//   getProductSuccess,
//   getFullProductData,
// };

export default KioskEdit;
