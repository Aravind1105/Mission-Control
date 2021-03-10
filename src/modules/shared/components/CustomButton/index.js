import React from 'react';
import { Button } from 'semantic-ui-react';

import './styles.less';
const width = window.innerWidth;
const CustomButton = ({
  onClick,
  label,
  icon,
  defaultStyle,
  className,
  color,
  ...props
}) => {
  if (width > 500) {
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
  } else {
    return (
      <>
        {icon ? (
          <Button
            className={`${
              defaultStyle
                ? 'custom-button-default-mobile'
                : 'custom-button-blue-mobile'
            } ${className}`}
            size="mini"
            onClick={onClick}
            content={label}
            color={color}
            {...props}
          />
        ) : (
          <Button
            onClick={onClick}
            className={`${
              defaultStyle
                ? 'custom-button-default-mobile'
                : 'custom-button-blue-mobile'
            } ${className}`}
            size="mini"
            color={color}
            {...props}
          >
            {label}
          </Button>
        )}
      </>
    );
  }
};

export default CustomButton;
