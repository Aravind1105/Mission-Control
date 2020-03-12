import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BackLink = ({ link, name }) => (
  <Grid.Column mobile={16} computer={8} textAlign="right">
    <Link to={link}>
      <Button icon labelPosition="left" basic compact size="mini">
        <Icon name="left arrow" />
        {name}
      </Button>
    </Link>
  </Grid.Column>
);

BackLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default BackLink;
