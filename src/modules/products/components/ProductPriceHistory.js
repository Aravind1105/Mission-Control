import React from 'react';
import { Segment, Divider } from 'semantic-ui-react';

const ProductPriceHistory = ({ priceHistory, kiosks }) => {
  const filtered = priceHistory ? priceHistory.filter(el => !el.default) : [];
  const defaultPrice = priceHistory.find(el => el.default);

  return (
    <Segment>
      <h3>Price history</h3>
      <Divider />
      <p>{`Default: ${defaultPrice ? defaultPrice.price : 0}€`}</p>
      <div>
        {filtered.map(({ validForKiosk, updated, price, _id }) => {
          const date = new Date(updated).toLocaleDateString();
          const kioskName = kiosks[validForKiosk] || 'noname';
          return <p key={_id}>{`${kioskName}: ${price}€ - ${date}`}</p>;
        })}
      </div>
    </Segment>
  );
};

ProductPriceHistory.defaultProps = {
  priceHistory: [],
};

export default ProductPriceHistory;
