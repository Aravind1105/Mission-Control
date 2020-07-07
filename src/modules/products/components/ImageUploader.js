import React, { useState, useEffect } from 'react';
import { Segment, Divider, Container } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import './styles.less';

const reg = /^.+\//;

const NoImageBlock = () => (
  <>
    Upload Product image
    <NoImg />
  </>
);

const ImageUploader = ({ src, setUploadedImage }) => {
  const [img, setImg] = useState(src);
  const [imageProp, setSize] = useState(null);
  const [imgName, setImgName] = useState('');

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
    };
    image.src = img || '';
  }, [img]);

  const handleChange = ({ target }) => {
    const { files } = target;
    const newImg = URL.createObjectURL(files[0]);
    setImgName(files[0].name);
    setImg(newImg);
    setUploadedImage(files[0]);
  };

  return (
    <Segment>
      <h3>Product Image</h3>
      <Divider />
      <div className="img-wrapper">
        <label htmlFor="productImgUpload">
          {img ? <img src={img} alt="product" /> : <NoImageBlock />}
          <input
            type="file"
            accept="image/*"
            id="productImgUpload"
            className="img-button"
            onChange={handleChange}
          />
        </label>
      </div>
      {imageProp ? (
        <Container textAlign="center">
          <div>{`Filename: ${imgName || imageProp.fileName}`}</div>
          <div>{`Size: ${imageProp.width}x${imageProp.height}px`}</div>
        </Container>
      ) : null}
    </Segment>
  );
};

export default ImageUploader;
