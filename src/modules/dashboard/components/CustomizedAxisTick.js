import React, { memo } from 'react';

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={10}
      dy={4}
      textAnchor="middle"
      fill="#333"
      // transform="rotate(360)"
    >
      {payload.value}
    </text>
  </g>
);

export default memo(CustomizedAxisTick);
