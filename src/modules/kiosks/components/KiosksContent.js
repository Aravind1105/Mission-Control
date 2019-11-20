import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import './KioskContent.css';
import styled from 'styled-components';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  Grid,
  Input,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Segment, Container, Pagination } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Unitable, valueEquals, conditionalValue } from '../../shared/components/unitableReloaded';
import { loadKiosksSaga } from '../actions/kioskActions';
var dateFormat = require("dateformat");
const KiosksContent = ({ loadKiosks, kiosks, history }) => {
  useEffect(() => {
    loadKiosks();
  }, []);
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row);
      history.push(`/kiosks/${row._id}/detail`);

    }
  }
  const nullChecker = cell => (!cell ? "-" : cell);
  const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
  }];
  const { SearchBar, ClearSearchButton } = Search;
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: nullChecker,
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '200px', textAlign: 'center' };
      },
    },
    {
      dataField: 'doorStatus',
      text: 'DoorStatus',
      sort: true,
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center',
        width: '110px'
      },

    },
    {
      dataField: 'temperature.value',
      text: 'Last Temperature',
      sort: true,
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center',
        width: '130px'

      },


    },
    {
      dataField: 'temperature.updated',
      text: 'Last Heartbeat',
      align: 'center',
      headerStyle: {
        textAlign: 'center'
      },
      formatter: (cell) => {

        let last_time = new Date(cell).toUTCString();
        let now = new Date().toUTCString();

        var dif = moment(now).diff(moment(last_time), 'minutes');
        console.log(last_time)
        console.log(now);
        console.log(dif);
        // return (<div style={{ backgroundColor: 'green' }}>5 mins</div>);
        return (
          <>
            {dif <= 5 ? <span>&#60;= 5 minutes</span> : dif <= 120 ? <span>&#60;= 2 hours</span> : <span>&#62; 2 hours</span>}
          </>
        );
      },
      style: (cell) => {
        let last_time = new Date(cell).toUTCString();
        let now = new Date().toUTCString();

        var color_diff = moment(now).diff(moment(last_time), 'minutes');
        if (color_diff <= 5) {
          return {
            backgroundColor: 'lightgreen'
          }
        }
        else if (color_diff <= 120) {
          return {
            backgroundColor: 'lightyellow'

          }
        }
        else {
          return {
            backgroundColor: '#FF6347'

          }
        }
      },
    },
    {
      dataField: 'serialNumber',
      text: 'Serial',
      formatter: nullChecker,
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'center' };
      },

    },
    {
      dataField: 'ownerOrganization.address[0]',
      text: 'Address',
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center'
      },
      formatter: (cell, row) => {
        return (
          <span>{cell.properties.city}, {cell.properties.line1} </span>
        );
      },
    },
    {
      text: 'Sales',
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center',
        width: '100px'
      },

    },
    // {
    //   text: 'Level',
    //   type: 'progress',
    //   formatter: nullChecker,
    //   align: 'center',
    //   headerStyle: {
    //     textAlign: 'center'
    //   },

    // },
  ];

  return (
    <Segment>
      <ToolkitProvider
        keyField='_id'
        data={kiosks}
        columns={columns}
        search
      >
        {
          props => (
            <div>
              <Grid stackable>
                <Grid.Row verticalAlign="middle" columns="equal">
                  {/* <Grid.Column> */}
                  <span className="grid-align">
                    <SearchBar {...props.searchProps} placeholder="Search any value..." />
                    <ClearSearchButton {...props.searchProps} />
                  </span>
                  {/* </Grid.Column> */}
                  <Grid.Column textAlign="right">
                    <Button
                      icon
                      labelPosition="left"
                      color="green"
                      compact
                    // onClick={() => openModal(true)}
                    >
                      <Icon name="right arrow" />
                      Add Kiosk
            </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* <FaSearch /> */}
              <hr />
              <BootstrapTable
                bootstrap4
                hover
                {...props.baseProps}
                defaultSorted={defaultSorted}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
              />
            </div>
          )
        }
      </ToolkitProvider>
      {/* <Unitable
        data={kiosks}
        columns={columns}
        onRowClick={clickRow}
        clickArgs={['_id']}
        sortable
        selectable
        sortByColumn="name"
      /> */}
      {/* <BootstrapTable
        bootstrap4
        hover
        keyField='_id'
        data={kiosks}
        columns={columns}
        rowEvents={rowEvents}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        pagination={paginationFactory()}
      /> */}
      {/* {true && (
        <Container textAlign="center">
          <Pagination
            style={{ marginTop: '10px' }}
            defaultActivePage={1}
            boundaryRange={0}
            onPageChange={null}
            size="mini"
            siblingRange={1}
            totalPages={1}
          />
        </Container>
      )} */}
    </Segment>
  );
};

const mapStateToProps = state => ({
  kiosks: state.kiosks,
});

const mapDispatchToProps = dispatch => ({
  loadKiosks: () => dispatch(loadKiosksSaga()),
});

KiosksContent.propTypes = {
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadKiosks: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KiosksContent),
);
