import React from 'react';
import { Button } from 'semantic-ui-react';

import './styles.less';
const screenWidth = window.innerWidth;

const CustomButton = ({
  onClick,
  label,
  icon,
  defaultStyle,
  className,
  color,
  size,
  ...props
}) => {
  return (
    <>
      {icon && screenWidth > 770 ? (
        <Button
          className={`${
            defaultStyle ? 'custom-button-default' : 'custom-button-blue'
          } ${className}`}
          onClick={onClick}
          content={label}
          icon={icon}
          labelPosition="left"
          color={color}
          {...props}
        />
      ) : (
        <Button
          onClick={onClick}
          className={`${
            defaultStyle ? 'custom-button-default' : 'custom-button-blue'
          } ${className}`}
          color={color}
          size={size}
          {...props}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
