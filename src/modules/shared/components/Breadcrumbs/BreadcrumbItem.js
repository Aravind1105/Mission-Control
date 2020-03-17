import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BreadcrumbItem = ({ link, name, isActive }) => (
  <>
    <Breadcrumb.Section link={false} active={isActive}>
      {isActive || !link ? name : <Link to={link}>{name}</Link>}
    </Breadcrumb.Section>
    {!isActive && <Breadcrumb.Divider icon="right chevron" />}
  </>
);

BreadcrumbItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  isActive: PropTypes.bool,
};

export default BreadcrumbItem;
