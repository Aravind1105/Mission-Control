import React, { memo } from 'react';

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={4}
      textAnchor="end"
      fill="#333"
      transform="rotate(-90)"
    >
      {payload.value}
    </text>
  </g>
);

export default memo(CustomizedAxisTick);
