import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid, Input, Icon, Popup } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

import CustomButton from '../shared/components/CustomButton';
import ConfirmModal from '../shared/components/ConfirmationModal';
import { createApiKey, deleteApiKey, loadApiKey } from './actions';
import { getApiKeyUserState, getApiKeySettingsState } from './selectors';
import './styles.css';
import Snippet from './components/Snippet';

const Security = ({
  createApiKey,
  apiKeyFromSettings,
  apiKeyFromUser,
  deleteApiKey,
  loadApiKey,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (!isDeleted && apiKeyFromUser) {
      // loading using saga because apiKey exists in state.user object in redux state
      loadApiKey(apiKeyFromUser);
    } else {
      // reset the data if deleted
      loadApiKey({ _id: '', secret: '', explanation: {} });
    }
  }, [isDeleted]);

  const { _id, secret, explanation } = apiKeyFromSettings;
  const isSecretExits = !isEmpty(secret);
  const secretKeyInput = useRef(null);

  const onClickCopy = event => {
    if (isSecretExits) {
      secretKeyInput.current.select();
      document.execCommand('copy');
      event.target.focus();
      toast({
        description: 'Secret key copied to clipboard!',
        animation: 'fade left',
        icon: 'info',
        color: 'green',
      });
    }
  };

  const handleDeleteApiKey = () => {
    deleteApiKey(_id);
    setIsConfirmModalOpen(false);
    setIsDeleted(true);
  };

  return (
    <div
      style={{
        margin: '40px 0 20px',
      }}
    >
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={8}>
            <Grid.Row>
              <span className="settings-custom-h5">
                Your Personal API Key Secret
              </span>{' '}
              <Popup
                content="Your API key secret should be treated as securely as a password. Never disclose your API key secret!"
                trigger={<Icon name="info circle" color="yellow" />}
              />
            </Grid.Row>
            <Grid.Row>
              <Input
                ref={secretKeyInput}
                className="api-key-input"
                action={{ icon: 'copy', onClick: onClickCopy }}
                style={{ width: '100%' }}
                value={secret}
              />
              {isSecretExits && (
                <Icon
                  name="delete"
                  color="red"
                  size="large"
                  className="delete-api-key-icon"
                  onClick={() => setIsConfirmModalOpen(true)}
                />
              )}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3}>
            <CustomButton
              label="Generate API Key"
              onClick={() => createApiKey()}
              disabled={isSecretExits}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {!isEmpty(explanation) && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <h5>Use Your API Key</h5>
              <p>
                Simply copy and paste header, payload and API secret at{' '}
                <a
                  href="https://jwt.io/"
                  target="_blank"
                  className="settings-link"
                >
                  jwt.io
                </a>{' '}
                to generate a JWT token.
              </p>
              <Grid.Row>
                The API can be called with the generated JWT token as <i>“ApiKey-v1 &lt;GENERATED-JWT-TOKEN&gt;“</i> in the
                Authorization Header instead of <i>“Bearer &lt;TOKEN&gt;“</i>.
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Snippet title="Header" content={explanation.jwtHeader} />
              <Snippet title="Payload" content={explanation.payloadExample} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      <ConfirmModal
        title="Confirm Revoke"
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
        confirmHandler={handleDeleteApiKey}
      >
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
  deleteApiKey,
  loadApiKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
