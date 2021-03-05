import React from 'react';
import { Button } from 'semantic-ui-react';

import './styles.less';

const CustomButton = ({
  onClick,
  label,
  icon,
  defaultStyle,
  className,
  color,
  ...props
}) => {
  return (
    <>
      {icon ? (
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
          {...props}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
