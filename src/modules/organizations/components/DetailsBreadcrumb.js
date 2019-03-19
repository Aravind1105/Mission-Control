import React from 'react';
import { Grid, Breadcrumb, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DetailsBreadCrumb = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} computer={8}>
          <Breadcrumb size={'small'}>
            <Breadcrumb.Section href="/dashboard">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section as={Link} to="/organizations">
              Organizations
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Grey Group</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8} textAlign="right">
          <Link to="/organizations">
            <Button icon labelPosition="left" basic compact size={'mini'}>
              <Icon name="left arrow" />
              Back to organizations
            </Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DetailsBreadCrumb;
