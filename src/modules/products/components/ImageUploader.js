import React, { useState, useEffect } from 'react';
import { Segment, Divider, Container, Icon } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import CustomButton from 'modules/shared/components/CustomButton';

import './styles.less';

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
  setUploadedImage,
  setIsImageDeleted,
  isCancelTriggered,
  isImageDeleted,
  setDisableForm,
}) => {
  const [img, setImg] = useState(src);
  const [imgName, setImgName] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [imageProp, setSize] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [initialImageProps, setInitialImageProps] = useState(null);
  const [initialImageName, setInitialImageName] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const fileName = img
        ? img.replace(reg, '').replace(/\%20/g, ' ')
        : 'noname';
      if (
        image.naturalWidth > 1400 ||
        image.naturalHeight > 1400 ||
        imageSize > 500000
      ) {
        setShowWarning(true);
        setDisableForm(true);
      } else {
        setDisableForm(false);
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
    image.src = img || '';
  }, [img]);

  useEffect(() => {
    if (isCancelTriggered) {
      setImg(src);
      setSize(isImageDeleted ? null : { ...initialImageProps });
      setImgName(initialImageName);
    }
  }, [isCancelTriggered]);

  const handleChange = ({ target }) => {
    const { files } = target;
    setImageSize(files[0].size);
    const newImg = URL.createObjectURL(files[0]);
    setImgName(files[0].name);
    setImg(newImg);
    setUploadedImage(files[0]);
    setIsImageDeleted(false);
    target.value = '';
  };

  const handleDelete = () => {
    setShowWarning(false);
    setImg(null);
    setSize(null);
    setImgName(null);
    setUploadedImage(null);
    setIsImageDeleted(true);
  };

  return (
    <Segment>
      <h3>Product Image</h3>
      <Divider />
      <div className="img-wrapper">
        {img ? <img src={img} alt="product" /> : <NoImageBlock />}
      </div>
      {imageProp && img && (
        <Container textAlign="center">
          <div className="filename-wrapper">{`Filename: ${imgName ||
            imageProp.fileName}`}</div>
          <div>{`Size: ${imageProp.width}x${imageProp.height}px`}</div>
        </Container>
      )}
      <div className="label-wrapper">
        {img && (
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
            <div className="label-side">{img ? 'Change' : 'Upload'} Image</div>
          </div>

          <input
            type="file"
            accept="image/*"
            id="productImgUpload"
            className="img-button"
            onChange={handleChange}
          />
        </label>
      </div>
      {showWarning && (
        <p className="image-warning">
          Image size should be equal or less then 1400x1400 and 500kb
        </p>
      )}
    </Segment>
  );
};

export default ImageUploader;
