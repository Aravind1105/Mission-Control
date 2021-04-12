import React, { useEffect } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import { getFullProductData, getPriceHistory } from './actions';
import {
  selectorGetProductInitValue,
  getDefaultPriceHistoryState,
} from './selectors';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import PriceHistoryTable from './components/PriceHistoryTable';

const PriceHistory = ({
  product,
  getFullProductData,
  getPriceHistory,
  defaultPriceHistory,
}) => {
  const { id } = useParams();
  const productName = product === null ? '' : product.name;
  const productLink = `/products/${id}`;
  const links = [
    {
      name: 'Home',
      link: '/dashboard',
    },
    {
      name: 'Products',
      link: '/products',
    },
    {
      name: productName,
      link: productLink,
    },
  ];

  const backLink = {
    name: productName,
    link: productLink,
  };

  useEffect(() => {
    if (isEmpty(productName)) {
      getFullProductData(id);
    }
    if (id) {
      getPriceHistory({ productLineId: id });
    }
  }, []);

  const columns = [
    {
      title: 'Date / Time Changed',
      field: 'validFrom',
    },
    {
      title: 'Price',
      field: 'price',
    },
    {
      title: 'Kiosk',
      field: 'kioskName',
    },
  ];

  return (
    <Grid stackable>
      <Grid.Column width={16}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Breadcrumbs
                  links={links}
                  backLink={backLink}
                  activeLink={'Price History'}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment className="">
                <SegmentHeader>
                  <Header as="h3">
                    <Header.Content>Price History</Header.Content>
                  </Header>
                </SegmentHeader>
                <PriceHistoryTable
                  sortByColumn="validFrom"
                  sortable
                  selectable
                  fixed
                  data={defaultPriceHistory}
                  columns={columns}
                  sortDirection="DESC"
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  product: selectorGetProductInitValue(state),
  defaultPriceHistory: getDefaultPriceHistoryState(state),
});

const mapDispatchToProps = {
  getFullProductData,
  getPriceHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistory);
