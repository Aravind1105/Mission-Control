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
  ScreenWidth,
  ...props
}) => {
  if (ScreenWidth > 700) {
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
  } else if (ScreenWidth < 321) {
    return (
      <>
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
            icon={icon}
            content={label}
            labelPosition="left"
            color={color}
            {...props}
          />
        ) : (
          <Button
            size="mini"
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
  }
};

export default CustomButton;
