import React, { useState, useEffect, useRef } from 'react';
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
      Please upload a JPG/PNG image with
      <br />
      max size 1400 x 1400 px, 500 KB
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
  const [checkImg, setCheckImg] = useState({
    imgSrc: null,
    imgName: null,
    imgSize: null,
    imgbase64: null,
  });
  const [imgProps, setImgProps] = useState({
    imgSrc: null,
    imgName: '',
    imgSize: {
      width: '',
      height: '',
    },
    imgbase64: '',
  });

  const [showWarning, setShowWarning] = useState(false);
  const [initialImageProps, setInitialImageProps] = useState(null);
  const [customAlertStatus, setCustomAlertStatus] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInput = useRef('');

  // show confirm dialog to user on click delete image or when the image is updated or deleted
  // upload image only if the size of the image is less then 500kb
  // upload image only if the height and width are less than or equal to 1400
  // imageProp will be null, if the product has no image originally
  // imageProp will contain image's height and width if the image is currently uploaded

  useEffect(() => {
    if (isImageUpdated || isImageDeleted) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isImageUpdated, isImageDeleted]);

  const updateImage = () => {
    modifyProductImage({
      id: initialValues.id,
      image: imgProps.imgbase64,
    });
    fileInput.current.value = '';
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
    if (showWarning) {
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }
  }, [showWarning]);

  useEffect(() => {
    let tempImage = src;
    if (checkImg.imgSrc) {
      const image = new Image();
      tempImage = checkImg.imgSrc;
      image.src = tempImage || '';

      image.onload = () => {
        const fileName = tempImage
          ? tempImage.replace(reg, '').replace(/\%20/g, ' ')
          : 'noname';
        if (
          image.naturalWidth > 1400 ||
          image.naturalHeight > 1400 ||
          checkImg.imgSize > 500000
        ) {
          setShowWarning(true);
        } else {
          setShowWarning(false);
          setImgProps({
            imgSrc: tempImage,
            imgName: fileName,
            imgSize: {
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
            imgbase64: checkImg.imgbase64,
          });
          setIsImageUpdated(true);
          setIsImageDeleted(false);
        }
      };
    } else {
      const initImage = new Image();
      initImage.src = tempImage;
      const fileName = tempImage
        ? tempImage.replace(reg, '').replace(/\%20/g, ' ')
        : 'noname';

      initImage.onload = () => {
        setInitialImageProps({
          width: initImage.naturalWidth,
          height: initImage.naturalHeight,
          fileName,
        });
      };
    }
  }, [checkImg]);

  useEffect(() => {
    if (src === '') {
      setImgProps({
        imgSrc: null,
        imgName: '',
        imgSize: {
          width: '',
          height: '',
        },
        imgbase64: '',
      });
    }
  }, [src]);

  useEffect(() => {
    if (isCancelTriggered) {
      setImgProps({
        imgSrc: null,
        imgName: '',
        imgSize: {
          width: '',
          height: '',
        },
        imgbase64: '',
      });
      fileInput.current.value = '';
      setIsCancelTriggered(false);
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
        setFirstUploadImage(imgProps.imgbase64);
      }
    }
  }, [customAlertStatus]);

  const handleChange = ({ target }) => {
    const { files } = target;
    const newImg = URL.createObjectURL(files[0]);
    // convert image into base64 string
    getBase64(files[0], base64Img => {
      setCheckImg({
        imgSrc: newImg,
        imgName: files[0].name,
        imgSize: files[0].size,
        imgbase64: base64Img,
      });
    });
  };

  const handleDelete = () => {
    setIsImageDeleted(true);
  };

  return (
    <Segment>
      <h3>Product Image</h3>
      <Divider />
      <div className="img-wrapper">
        {imgProps.imgSrc || src ? (
          <img src={imgProps.imgSrc || src} alt="product" />
        ) : (
          <NoImageBlock />
        )}
      </div>
      {(imgProps.imgSrc || src) && (
        <Container textAlign="center">
          <div className="filename-wrapper">{`Filename: ${(imgProps.imgName !==
            null &&
            imgProps.imgName) ||
            (initialImageProps && initialImageProps.fileName)}`}</div>
          <div>{`Size: ${(imgProps.imgSize.width !== null &&
            imgProps.imgSize.width) ||
            (initialImageProps && initialImageProps.width)}x${(imgProps.imgSize
            .height !== null &&
            imgProps.imgSize.height) ||
            (initialImageProps && initialImageProps.height)}px`}</div>
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
            disabled={showWarning}
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
            accept="image/x-png,image/jpg,image/jpeg"
            id="productImgUpload"
            className="img-button"
            onChange={e => handleChange(e)}
            ref={ref => (fileInput.current = ref)}
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
          Image size should be equal or less then 1400 x 1400 px and 500 KB
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
