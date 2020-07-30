import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


const CustomTooltip = props => {
  if (props.payload && props.payload[0] != null) {
    const totalAmount = props.payload.reduce((acc, elem) => +elem.value + acc,
      0);
    const newPayload = [
      ...props.payload.sort((a, b) => b.value - a.value).map(elem => ({ ...elem, value: `€ ${elem.value}` })),
      {
        value: `€ ${totalAmount.toFixed(2)}`,
        name: 'Total',
      },
    ];
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props} />;
};

export default CustomTooltip;
