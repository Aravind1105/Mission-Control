import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

import './styles.less';

export default ({ avatar, name, email }) => (
  <div className="toolbar-user-info">
    <div className="toolbar-user-avatar">
      <Image avatar src={avatar} size="small" />
    </div>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <h3 className="toolbar-user-name">{name}</h3>
          <p className="toolbar-user-email">{email}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);
