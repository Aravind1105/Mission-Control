import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Divider, Container, Icon } from 'semantic-ui-react';
import { modifyProductImage, deleteProductImage } from '../actions';
import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import CustomButton from 'modules/shared/components/CustomButton';
import CustomAlert from 'modules/shared/components/CustomAlert';

import './styles.less';
import getBase64 from '../../../lib/imageToBase64';
import { get } from 'lodash';

const reg = /^.+\//;

const NoImageBlock = () => (
  <>
    <p className="image-upload-text">
      Please upload JPG image with
      <br />
      max size 1400x1400px
    </p>
    <NoImg />
  </>
);

const ImageUploader = ({
  src,
  isCancelTriggered,
  setIsCancelTriggered,
  initialValues,
  modifyProductImage,
  deleteProductImage,
  setFirstUploadImage,
}) => {
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [imageProp, setSize] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [initialImageProps, setInitialImageProps] = useState(null);
  const [initialImageName, setInitialImageName] = useState(null);
  const [customAlertStatus, setCustomAlertStatus] = useState(false);
  const [base64Img, setBase64Img] = useState('');
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // show confirm dialog to user on click delete image or when the image is updated
  useEffect(() => {
    if ((isImageDeleted || isImageUpdated) && imageSize <= 500000) {
      setShowAlert(true);
    }
  }, [isImageDeleted, isImageUpdated]);

  const updateImage = () => {
    modifyProductImage({
      id: initialValues.id,
      image: base64Img,
    });
    setIsImageUpdated(false);
    setCustomAlertStatus(false);
  };

  const deleteImage = () => {
    deleteProductImage({
      id: initialValues.id,
      orgId: initialValues.orgId,
    });
    setIsImageDeleted(false);
    setCustomAlertStatus(false);
  };

  useEffect(() => {
    const image = new Image();
    let tempImage = src;
    if (img) {
      tempImage = img;
    }
    image.onload = () => {
      const fileName = tempImage
        ? tempImage.replace(reg, '').replace(/\%20/g, ' ')
        : 'noname';
      if (
        image.naturalWidth > 1400 ||
        image.naturalHeight > 1400 ||
        imageSize > 500000
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
      setSize({
        width: image.naturalWidth,
        height: image.naturalHeight,
        fileName,
      });
      setInitialImageProps({
        width: image.naturalWidth,
        height: image.naturalHeight,
        fileName,
      });
      setInitialImageName(fileName);
    };
    image.src = tempImage || '';
  }, [img]);

  useEffect(() => {
    if (isCancelTriggered) {
      setImg(src);
      setSize(isImageDeleted ? null : { ...initialImageProps });
      setImgName(initialImageName);
    }
  }, [isCancelTriggered]);

  useEffect(() => {
    if (customAlertStatus) {
      if (isImageUpdated && initialValues.id !== undefined) {
        updateImage();
      } else if (isImageDeleted) {
        deleteImage();
      } else if (initialValues.id === undefined) {
        // while creating a new product with image, this method will be called
        setFirstUploadImage(base64Img);
      }
    }
  }, [customAlertStatus]);

  const handleChange = ({ target }) => {
    const { files } = target;
    const newImg = URL.createObjectURL(files[0]);
    setImageSize(files[0].size);
    setImgName(files[0].name);
    setImg(newImg);
    setIsImageUpdated(true);
    setIsImageDeleted(false);

    // convert image into base64 string
    getBase64(files[0], base64Img => {
      setBase64Img(base64Img);
    });
  };

  const handleDelete = () => {
    setShowWarning(false);
    setImg(null);
    setSize(null);
    setImgName(null);
    setIsImageUpdated(false);
    setIsImageDeleted(true);
  };

  return (
    <Segment>
      <h3>Product Image</h3>
      <Divider />
      <div className="img-wrapper">
        {img || src ? <img src={img || src} alt="product" /> : <NoImageBlock />}
      </div>
      {imageProp && (img || src) && (
        <Container textAlign="center">
          <div className="filename-wrapper">{`Filename: ${imgName ||
            imageProp.fileName}`}</div>
          <div>{`Size: ${imageProp.width}x${imageProp.height}px`}</div>
        </Container>
      )}
      <div className="label-wrapper">
        {src && (
          <CustomButton
            onClick={handleDelete}
            defaultStyle
            label="Delete Image"
            icon="trash alternate outline"
            className="image-button "
          />
        )}
        <label htmlFor="productImgUpload" className="modify-button">
          <div className="label-content">
            <div className="icon-side">
              <Icon name="upload" />
            </div>
            <div className="label-side">{src ? 'Change' : 'Upload'} Image</div>
          </div>

          <input
            type="file"
            accept="image/*"
            id="productImgUpload"
            className="img-button"
            onChange={handleChange}
          />
        </label>
        <CustomAlert
          visible={showAlert}
          onApprove={() => {
            setCustomAlertStatus(true);
            setShowAlert(false);
          }}
          onCancel={() => {
            setIsCancelTriggered(true);
            setIsImageDeleted(false);
            setIsImageUpdated(false);
            setShowAlert(false);
          }}
          alertMsg={
            isImageDeleted
              ? `Are you sure that you want to DELETE the pictures of this product?`
              : `Are you sure that you want to UPDATE the picture of this product?`
          }
        />
      </div>
      {showWarning && (
        <p className="image-warning">
          Image size should be equal or less then 1400x1400 and 500kb
        </p>
      )}
    </Segment>
  );
};

const mapStateToProps = state => ({
  src: get(state.products.product, 'images[0]', ''),
});

const mapDispatchToProps = {
  modifyProductImage,
  deleteProductImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
