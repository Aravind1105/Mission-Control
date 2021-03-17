import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Divider,
  Icon,
  Dropdown,
  Checkbox,
  Input,
} from 'semantic-ui-react';
import * as R from 'ramda';
import { getKioskSingle, getContentPlaylist } from '../selectors';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';

import './styles.less';
import { deletePlayList, updatePlayList } from '../actions';

const ContentPlaylist = ({ playlist, redirectHandler, ...props }) => {
  const kioskId = props.match.params.id;
  const dispatch = useDispatch();
  const orders = [];
  const [finalPlaylist, setPlaylist] = useState(playlist);
  const [imgExt, setImgExt] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [img, setImg] = useState('');
  const [DataURL, setDataURL] = useState('');
  const [imageSize, setImageSize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteImg, setDeleteImg] = useState({});

  const onSubmit = () => {
    const data = [];
    finalPlaylist.map(list => {
      const props = {
        _id: list.id,
        name: list.imgData.name,
        image: list.imgData.uri,
        duration: list.duration,
        type:
          list.type === 'Main Screen'
            ? 'main_screen'
            : list.type === 'Explainer Animation'
            ? 'explainer'
            : 'content',
        enabled: list.isEnabled,
        order: list.order,
      };
      data.push(props);
    });
    dispatch(updatePlayList({ kioskId, data }));
  };

  const onDelete = () => {
    const id = deleteImg.id;
    dispatch(deletePlayList({ kioskId, id }));
    setIsModalOpen(false);
  };

  const sortByASC = () => {
    setPlaylist(R.sortWith([R.ascend(R.prop('order'))]));
  };

  const toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };

  useEffect(() => {
    if (showWarning)
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
  }, [showWarning]);

  useEffect(() => {
    const image = new Image();
    image.src = img || '';
    setImg('');
    image.onload = () => {
      if (
        image.naturalWidth > 800 ||
        image.naturalHeight > 1280 ||
        imageSize > 500000
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
        toDataURL(image.src, function(url) {
          setDataURL(url);
        });
        let newState = [];
        if (finalPlaylist) newState = [...finalPlaylist];
        let newArray = {
          id: 'ObjectID',
          type: 'Image Content ' + `${newState.length + 1}`,
          imgData: {
            uri: DataURL,
            name: 'Image Content ' + `${newState.length + 1}.${imgExt}`,
          },
          duration: 10,
          order:
            newState.length > 0 ? newState[newState.length - 1].order + 1 : 1,
          isEditable: true,
          isDeletable: true,
          isEnabled: true,
        };
        newState.push(newArray);
        setPlaylist(newState);
      }
    };
  }, [img]);

  finalPlaylist &&
    finalPlaylist.map(list => {
      const data = {
        key: list.order,
        value: list.order,
        text: list.order,
        disabled: (list.order === 1 || list.order === 2) && true,
      };
      orders.push(data);
    });

  const updatePlaylistProps = (val, id, key) => {
    let newState = [...finalPlaylist];
    newState.map(st => {
      if (st.id === id) {
        st[key] = val;
      }
    });
    setPlaylist(newState);
  };
  const updatePlaylistOrderProps = (val, id, key) => {
    let newState = [...finalPlaylist];
    let prevOrder;
    newState.map(st => {
      if (st.id === id) prevOrder = st[key];
    });
    newState.some(st => {
      if (st[key] === val) st[key] = prevOrder;
      if (st.id === id) st[key] = val;
    });
    sortByASC(newState);
  };

  const handleImageUpload = ({ target }) => {
    const { files } = target;
    const lastDot = files[0].name.lastIndexOf('.');
    const ext = files[0].name.substring(lastDot + 1);
    const newImg = URL.createObjectURL(files[0]);
    setImg(newImg);
    setImgExt(ext);
    setImageSize(files[0].size);
    target.value = '';
  };

  const handleDeleteImage = list => {
    setDeleteImg(list);
    setIsModalOpen(true);
  };

  return (
    <div style={{ marginTop: '30px' }}>
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
        {finalPlaylist &&
          finalPlaylist.map(list => {
            return (
              <>
                <Grid.Row style={{ alignItems: 'center', padding: '0.5rem 0' }}>
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
                      style={{
                        position: 'absolute',
                        top: '40px',
                        left: '100px',
                      }}
                    >
                      {list.imgData && list.imgData.name}
                    </span>
                  </Grid.Column>
                  <Grid.Column style={{ width: '12%' }}>
                    <Dropdown
                      compact
                      value={list.order}
                      options={orders}
                      disabled={!Boolean(list.isDeletable)}
                      onChange={(e, { value }) =>
                        updatePlaylistOrderProps(value, list.id, 'order')
                      }
                    />
                  </Grid.Column>
                  <Grid.Column style={{ color: '#828282', width: '15%' }}>
                    <Input
                      size="mini"
                      style={{ width: '15px' }}
                      defaultValue={list.duration}
                      disabled={!Boolean(list.isDeletable)}
                      label={{ basic: true, content: 'sec' }}
                      labelPosition="right"
                      onChange={(e, { value }) =>
                        updatePlaylistProps(
                          parseInt(value),
                          list.id,
                          'duration',
                        )
                      }
                      validations={{
                        matchRegexp: /^(\d*\.)?\d+$/,
                      }}
                      validationErrors={{
                        matchRegexp: 'Name can only be numeric',
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    {list.isEditable && list.isDeletable ? (
                      <span style={{ float: 'right' }}>
                        <Checkbox
                          toggle
                          fitted
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
                          onClick={() => handleDeleteImage(list)}
                        />
                      </span>
                    ) : (
                      list.isEditable && (
                        <span style={{ float: 'right' }}>
                          <Checkbox
                            toggle
                            fitted
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
        {finalPlaylist && finalPlaylist.length > 5 ? null : (
          <Grid.Row>
            <Grid.Column style={{ width: '19%', paddingRight: '0px' }}>
              <div className="label-playlist-wrapper">
                <label
                  htmlFor="playlistImgUpload"
                  className="modify-playlist-button"
                >
                  <div className="label-playlist-content">
                    <div className="icon-playlist-side">
                      <Icon name="upload" />
                    </div>
                    <div className="label-playlist-side">Add Image Content</div>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    id="playlistImgUpload"
                    className="img-playlist-button"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </Grid.Column>
            <Grid.Column className="img-note">
              Please upload a JPG/PNG image with max size 800 x 1280px. Max File
              Size: 500kb
              <a
                href="https://docs.google.com/presentation/d/1mRBcd95oss5RKWDhHG5yqhwK15PJrpyuQk-RC0O8lAs/edit?usp=sharing"
                target="_blank"
                style={{ display: 'block', marginTop: '5px' }}
              >
                Use our Template
              </a>
            </Grid.Column>
          </Grid.Row>
        )}
        {showWarning && (
          <Grid.Row className="image-playlist-warning">
            <Icon name="warning" />
            <span>
              Image size should be equal or less then 800x1280px and 500kb
            </span>
          </Grid.Row>
        )}
        {finalPlaylist && finalPlaylist.length > 0 && (
          <Grid.Row textAlign="center" style={{ justifyContent: 'center' }}>
            <Grid.Column>
              <Button type="button" onClick={redirectHandler}>
                Cancel
              </Button>
              <Button color="green" type="submit" onClick={onSubmit}>
                Save
              </Button>
            </Grid.Column>
          </Grid.Row>
        )}
        <ConfirmationModal
          title="Confirm Delete"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          confirmHandler={onDelete}
        >
          <p>Are you sure you want to delete this content</p>
          <p>
            <b>{Object.keys(deleteImg).length > 0 && deleteImg.imgData.name}</b>{' '}
            from the screen playlist?
          </p>
        </ConfirmationModal>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  playlist: getContentPlaylist(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPlaylist);
