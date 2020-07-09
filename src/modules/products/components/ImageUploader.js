import React, { useState, useEffect } from 'react';
import { Segment, Divider, Container } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import './styles.less';

const reg = /^.+\//;

const NoImageBlock = () => (
  <>
    <p className="image-upload-text">
      Please upload JPG image with
      <br />
      max size 800x800px
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
}) => {
  const [img, setImg] = useState(src);
  const [imageProp, setSize] = useState(null);
  const [imgName, setImgName] = useState('');

  const [initialImageProps, setInitialImageProps] = useState(null);
  const [initialImageName, setInitialImageName] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const fileName = img
        ? img.replace(reg, '').replace(/\%20/g, ' ')
        : 'noname';
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
    const newImg = URL.createObjectURL(files[0]);
    setImgName(files[0].name);
    setImg(newImg);
    setUploadedImage(files[0]);
    setIsImageDeleted(false);
    target.value = '';
  };

  const handleDelete = () => {
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
      {
        imageProp && img && (
          <Container textAlign="center">
            <div className="filename-wrapper">{`Filename: ${imgName || imageProp.fileName}`}</div>
            <div>{`Size: ${imageProp.width}x${imageProp.height}px`}</div>
          </Container>
        ) }
      <div className="label-wrapper">
        {
          img && <button type="button" className="modify-button" onClick={handleDelete}>Delete Image</button>
      }
        <label htmlFor="productImgUpload" className="modify-button">

          {img ? 'Change' : 'Upload'}
          {' '}
          Image
          <input
            type="file"
            accept="image/*"
            id="productImgUpload"
            className="img-button"
            onChange={handleChange}
          />
        </label>
      </div>
    </Segment>
  );
};

export default ImageUploader;
