import React, { memo } from 'react';
import './styles.less';

const CircleChart = ({
  size,
  percent,
  strokeWidth,
  progressColor,
  textColor,
  className,
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg className={`progress-ring ${className}`} width={size} height={size}>
      <circle
        className="progress-ring__circle"
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="progress-ring__circle"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset: offset }}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <text
        className="progress-ring__text"
        x="50%"
        y="50%"
        fill={textColor}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {`${percent}%`}
      </text>
    </svg>
  );
};

CircleChart.defaultProps = {
  strokeWidth: 4,
  percent: 0,
  progressColor: 'black',
  textColor: 'grey',
  className: '',
};

export default memo(CircleChart);
