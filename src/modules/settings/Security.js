import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid, Input, Label } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

import CustomButton from '../shared/components/CustomButton';
import { createApiKey } from './actions'
import { getApiKeyState } from './selectors';

const Security = ({
  createApiKey,
  apiKeyObject,
}) => {
  const { id, secret } = apiKeyObject;
  const secretKeyInput = useRef(null);

  const onClickCopy = (event) => {
    secretKeyInput.current.select();
    document.execCommand('copy');
    event.target.focus();
    toast({ description: 'Secret key copied to clipboard!', animation: 'fade left', icon: 'info', color: 'green' });
  };

  return (
    <div style={{
      margin: '40px 0 20px',
    }}>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={9}>
            <h5>Your Personal API Key</h5>
            <Input ref={secretKeyInput} action={{ icon: 'copy', onClick: onClickCopy }} style={{ width: '100%' }} value={secret} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3}>
            <CustomButton label="Generate API Key" onClick={() => createApiKey()} disabled={!isEmpty(secret)} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKeyObject: getApiKeyState(state),
});

const mapDispatchToProps = {
  createApiKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
