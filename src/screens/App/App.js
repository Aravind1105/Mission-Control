import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from 'assets/img/logo.svg';
import './App.css';

/**
 * i18n
 * use <FormattedMessage id="xxx.yyy"/> when inside tags
 * and this.props.intl.formatMessage({id:'xxx.yyy'});
 */
import { FormattedMessage, injectIntl, intlShape} from 'react-intl';

class App extends Component {

  processMessage() {

  }

  render() {
    return (
      <div className="App">
      {{
          'HOME': (
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">
                  <FormattedMessage id="screens.app.welcomeMessage"/>
                </h1>
              </header>
              <p className="App-intro">
                  <span title={this.props.intl.formatMessage({id:'screens.app.title1'},{other_form:'injectIntl'})}>
                  <FormattedMessage id="screens.app.msg1" values={{script_path: <code>src/screens/App/App.js</code>}}/>
                  </span>
              </p>
            </div>
          ),
          '@@redux-first-router/NOT_FOUND': (
              <div>Page not found.</div>
          )
      }[this.props.location.type]}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default injectIntl(connect(mapStateToProps)(App));
