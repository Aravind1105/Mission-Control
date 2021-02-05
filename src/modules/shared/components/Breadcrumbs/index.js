import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Breadcrumb } from 'semantic-ui-react';

import BreadcrumbItem from './BreadcrumbItem';
import BackLink from './BackLink';

const Breadcrumbs = ({ links, backLink, activeLink }) => {
  return (
    <Grid>
      <Grid.Row verticalAlign="middle" columns="equal">
        <Grid.Column mobile={10} computer={12}>
          <Breadcrumb size="small">
            {links.map(prop => (
              <BreadcrumbItem key={prop.name} {...prop} />
            ))}
            <BreadcrumbItem name={activeLink} isActive />
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column mobile={6} computer={4}>
          {backLink && <BackLink {...backLink} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const linkPropTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Breadcrumbs.propTypes = {
  activeLink: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape(linkPropTypes)),
  backLink: PropTypes.shape(linkPropTypes),
};

export default Breadcrumbs;
