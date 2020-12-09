import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

import CustomButton from '../shared/components/CustomButton';
import ConfirmModal from '../shared/components/ConfirmationModal';
import { createApiKey } from './actions'
import { getApiKeyUserState, getApiKeySettingsState } from './selectors';
import './styles.css';

const Security = ({
  createApiKey,
  apiKeyFromSettings,
  apiKeyFromUser,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  let apiKeyObject = apiKeyFromUser;
  if (isEmpty(apiKeyObject)) {
    apiKeyObject = apiKeyFromSettings;
  }
  const { id, secret } = apiKeyObject;
  const isSecretExits = !isEmpty(secret);

  const secretKeyInput = useRef(null);
  const onClickCopy = (event) => {
    secretKeyInput.current.select();
    document.execCommand('copy');
    event.target.focus();
    toast({ description: 'Secret key copied to clipboard!', animation: 'fade left', icon: 'info', color: 'green' });
  };
  const handleDeleteApiKey = () => {
    alert();
  };

  return (
    <div style={{
      margin: '40px 0 20px',
    }}>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={8}>
            <h5>Your Personal API Key</h5>
            <Grid.Row>
              <Input ref={secretKeyInput} className="api-key-input" action={{ icon: 'copy', onClick: onClickCopy }} style={{ width: '100%' }} value={secret} />
              {isSecretExits && <Icon name="delete" color="red" size="large" className="delete-api-key-icon" onClick={() => setIsConfirmModalOpen(true)} />}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3}>
            <CustomButton label="Generate API Key" onClick={() => createApiKey()} disabled={isSecretExits} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ConfirmModal title="Confirm Revoke" isModalOpen={isConfirmModalOpen} setIsModalOpen={setIsConfirmModalOpen} confirmHandler={handleDeleteApiKey}>
        <p>Are you sure you want to permanently revoke your API key?</p>
      </ConfirmModal>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKeyFromSettings: getApiKeySettingsState(state),
  apiKeyFromUser: getApiKeyUserState(state),
});

const mapDispatchToProps = {
  createApiKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
