import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Breadcrumb } from 'semantic-ui-react';

import BreadcrumbItem from './BreadcrumbItem';
import BackLink from './BackLink';

const Breadcrumbs = ({ links, backLink, activeLink }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} computer={8}>
          <Breadcrumb size="small">
            {links.map(prop => (
              <BreadcrumbItem key={prop.name} {...prop} />
            ))}
            <BreadcrumbItem name={activeLink} isActive />
          </Breadcrumb>
        </Grid.Column>

        {backLink && <BackLink {...backLink} />}
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
