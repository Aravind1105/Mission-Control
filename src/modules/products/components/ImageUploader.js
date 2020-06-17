import React, { useState } from 'react';
import { Segment, Divider } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import './styles.less';

const NoImageBlock = () => (
  <>
    Upload Product image
    <NoImg />
  </>
);
const ImageUploader = ({ src }) => {
  const [img, setImg] = useState(src);

  const handleChange = ({ target }) => {
    const { files } = target;
    const newImg = URL.createObjectURL(files[0]);
    setImg(newImg);
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
    </Segment>
  );
};

export default ImageUploader;
