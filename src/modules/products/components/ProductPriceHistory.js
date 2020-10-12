import React from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import format from 'date-fns/format';

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
          const date = format(new Date(updated), 'dd-MM-yyyy, HH:mm:ss');
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
