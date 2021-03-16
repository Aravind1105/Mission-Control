import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Segment,
  Header,
  Divider,
  Icon,
  Dropdown,
  Checkbox,
} from 'semantic-ui-react';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import {
  getKioskSingle,
  getContentPlaylist,
  getPlaylistOrders,
} from '../selectors';

import './styles.less';
import { Field } from 'formik';

const ContentPlaylist = ({ match, kiosk, playlist, playlistOrder }) => {
  const { id } = match.params;
  const orders = [];

  const [finalPlaylist, setPlaylist] = useState(playlist);

  const getData = ({ sort }) => {
    const data = {
      kioskId: !kiosk ? id : kiosk._id,
    };
  };

  useEffect(() => {}, []);
  finalPlaylist.map(list => {
    const data = {
      key: list.order,
      value: list.order,
      text: list.order,
      disabled: (list.order === 1 || list.order === 2) && true,
    };
    orders.push(data);
  });
  console.log(orders);
  console.log(playlistOrder);

  const updatePlaylistProps = (val, id, key) => {
    let newState = [...finalPlaylist];
    newState.map(st => {
      if (st.id === id) {
        st[key] = val;
      }
    });
    console.log(newState, 'ASAS');
    setPlaylist(newState);
    console.log(finalPlaylist, 'aqwsq');
  };

  const getFormat = dur => {
    let totalSeconds = dur;
    let hrs = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, 0);
    totalSeconds %= 3600;
    let mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, 0);
    let secs = (totalSeconds % 60).toString().padStart(2, 0);
    if (dur < 60) return hrs + ':' + mins + ':' + secs + ' ';
  };
  return (
    <>
      <Grid.Row>
        <Header as="h3">Content Playlist</Header>
        <Divider />
      </Grid.Row>
      <Grid columns={5} className="header-col">
        <Grid.Row className="header-row">
          <Grid.Column style={{ width: '17%' }}>Type</Grid.Column>
          <Grid.Column style={{ width: '23% ' }}>Name</Grid.Column>
          <Grid.Column style={{ width: '12% ' }}>Order</Grid.Column>
          <Grid.Column style={{ width: '15% ' }}>Duration</Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={5} className="cell-col">
        {finalPlaylist.map(list => {
          return (
            <>
              <Grid.Row style={{ alignItems: 'center' }}>
                <Grid.Column
                  style={{
                    color: '#000000',
                    fontWeight: '700',
                    width: '17%',
                  }}
                >
                  {list.type}
                </Grid.Column>
                <Grid.Column style={{ width: '23%' }}>
                  <img
                    src={require('../../../styling/assets/images/shelf_capacities.png')}
                    style={{
                      height: 100,
                      width: 70,
                    }}
                  />
                  <span
                    style={{ position: 'absolute', top: '40px', left: '100px' }}
                  >
                    {list.imgData.name}
                  </span>
                </Grid.Column>
                <Grid.Column style={{ width: '12%' }}>
                  <Dropdown
                    compact
                    defaultValue={list.order}
                    options={playlistOrder}
                    disabled={!Boolean(list.isDeletable)}
                    component={FormAsyncSelect}
                    onChange={(e, { value }) =>
                      updatePlaylistProps({ value }, list.id, 'order')
                    }
                  />
                </Grid.Column>
                <Grid.Column style={{ color: '#828282', width: '15%' }}>
                  {getFormat(list.duration)}
                  {list.isEditable && <Icon name="edit" />}
                </Grid.Column>
                <Grid.Column>
                  {list.isEditable && list.isDeletable ? (
                    <span style={{ float: 'right' }}>
                      <Checkbox
                        toggle
                        checked={list.isEnabled}
                        style={{ top: '7px', paddingRight: '10px' }}
                        onChange={() =>
                          updatePlaylistProps(
                            !list.isEnabled,
                            list.id,
                            'isEnabled',
                          )
                        }
                      />{' '}
                      <Icon
                        link
                        name="close"
                        style={{ color: 'red', fontSize: '1.5em' }}
                      />
                    </span>
                  ) : (
                    list.isEditable && (
                      <span style={{ float: 'right' }}>
                        <Checkbox
                          toggle
                          style={{ top: '7px', paddingRight: '10px' }}
                          onChange={() =>
                            updatePlaylistProps(
                              !list.isEnabled,
                              list.id,
                              'isEnabled',
                            )
                          }
                        />
                      </span>
                    )
                  )}
                </Grid.Column>
              </Grid.Row>
              <Divider />
            </>
          );
        })}
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  // activityLogs: getActivityLogsState(state),
  playlistOrder: getPlaylistOrders(state),
  playlist: getContentPlaylist(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPlaylist);
