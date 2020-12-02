import React from 'react';
import { Image } from 'semantic-ui-react';

import './styles.less';

export default ({ avatar, name, email }) => (
  <div className="toolbar-user-info">
    <div className="toolbar-user-avatar">
      <Image avatar src={avatar} size="small" />
    </div>
    <div className="toolbar-user-info-text">
      <h3 className="toolbar-user-name">{name}</h3>
      <p className="toolbar-user-email">{email}</p>
    </div>
  </div>
);