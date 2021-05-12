import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BackLink = ({ link, name }) => (
  <Grid>
    <Grid.Column computer={16} textAlign="right" only="computer">
      <Link to={link}>
        <Button icon labelPosition="left" basic compact size="mini">
          <Icon name="left arrow" />
          {name}
        </Button>
      </Link>
    </Grid.Column>
    <Grid.Column mobile={16} textAlign="right" only="mobile tablet">
      <Link to={link}>
        <Button basic icon="arrow left" />
      </Link>
    </Grid.Column>
  </Grid>
);

BackLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default BackLink;
