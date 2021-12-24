import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { getTotalUsers } from '../selectors';
import './styles.less';

const UsersDetail = ({ total }) => {
  return (
    <div className="user-info">
      <Segment className="usr-detail-style user-empty">
        <Grid stretched>
          <p className="user-empty-title">Please select a user from the list</p>
          <Grid.Row columns="equal" stretched>
            <Grid.Column textAlign="right">
              <Grid.Row>
                <span className="empty-total-users-label">Total Users</span>
              </Grid.Row>
              <Grid.Row>
                <span className="empty-total-users">{total}</span>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column textAlign="left">
              <Grid.Row>
                <Icon name="users" size="huge" className="user-empty-icon" />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  total: getTotalUsers(state),
});

export default connect(mapStateToProps)(UsersDetail);
