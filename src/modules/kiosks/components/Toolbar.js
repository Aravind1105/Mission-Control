import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Input,
  Button,
  Icon,
  Dropdown,
  Divider,
} from 'semantic-ui-react';
import CustomButton from 'modules/shared/components/CustomButton';
import { toast } from 'react-semantic-toasts';
import { exportCsvOrderList } from '../actions';
import { exportCsvPackList } from '../actions';
import './styles.less';
import SelectCheckBoxes from '../../shared/components/SelectCheckBoxes';
import { getSelectedKiosksState } from '../selectors';

const Toolbar = ({
  search,
  setSearch,
  kiosks,
  setKiosk,
  organizations,
  setOrganization,
  rootUser,
  exportCsvOrderList,
  exportCsvPackList,
  selectedOrganization,
  selectedKiosks,
  isLoading,
  // kiosksNetworkStatus, //!LIV-2285
  // setKioskNetworkStatus //!LIV-2285
}) => {
  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleKioskChange = value => {
    setKiosk(value);
  };

  const handleOrganizationChange = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    setOrganization(text);
  };

  const DownloadOrderListCsv = () => {
    exportCsvOrderList();
    toast({
      description: 'Downloading the requested file.',
      animation: 'fade left',
      icon: 'info',
      color: 'blue',
    });
  };

  const DownloadPackListCsv = () => {
    exportCsvPackList();
    toast({
      description: 'Downloading the requested file.',
      animation: 'fade left',
      icon: 'info',
      color: 'blue',
    });
  };

  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={6}>
            <Input
              icon="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="full-width"
            />
          </Grid.Column>
          {!rootUser && (
            <>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <div className="download_orderlist_button_admin">
                  <CustomButton
                    label="Download Order List"
                    icon="arrow down"
                    className="custom-button-default"
                    onClick={DownloadOrderListCsv}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="download_packlist_button_admin">
                  <CustomButton
                    label="Download Pack List"
                    icon="arrow down"
                    className="custom-button-default"
                    onClick={DownloadPackListCsv}
                  />
                </div>
              </Grid.Column>
            </>
          )}
          {rootUser && (
            <Grid.Column textAlign="right">
              <div className="add_kiosk_button">
                <Button
                  icon
                  labelPosition="left"
                  color="green"
                  compact
                  as={Link}
                  to="/kiosks/edit/new"
                >
                  <Icon name="right arrow" />
                  Add Kiosk
                </Button>
              </div>
            </Grid.Column>
          )}
        </Grid.Row>

        {rootUser && (
          <>
            <Divider style={{ marginTop: 0, marginBottom: 0 }} />
            <Grid.Row verticalAlign="middle" verticalAlign="middle" columns={5}>
              <Grid.Column computer={3}>
                <SelectCheckBoxes
                  title="Kiosks"
                  options={kiosks}
                  allOptionKey="all"
                  onClickApply={handleKioskChange}
                  value={selectedKiosks}
                  isLoading={isLoading}
                />
              </Grid.Column>
              <Grid.Column computer={3}>
                <Dropdown
                  placeholder="All Organization"
                  selection
                  className="full-width"
                  onChange={handleOrganizationChange}
                  options={organizations}
                  value={selectedOrganization}
                />
              </Grid.Column>

              <Grid.Column computer={3}></Grid.Column>
              <Grid.Column computer={3}>
                <div className="download_orderlist_button">
                  <CustomButton
                    label="Download Order List"
                    icon="arrow down"
                    className="custom-button-default"
                    onClick={DownloadOrderListCsv}
                  />
                </div>
              </Grid.Column>

              <Grid.Column computer={3}>
                <div className="download_packlist_button">
                  <CustomButton
                    label="Download Pack List"
                    icon="arrow down"
                    className="custom-button-default"
                    onClick={DownloadPackListCsv}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </>
        )}
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rootUser: state.user.root,
  selectedKiosks: getSelectedKiosksState(state),
  isLoading: state.kiosks.isLoading,
});
const mapDispatchToProps = {
  exportCsvOrderList,
  exportCsvPackList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
