import auth0 from 'auth0-js';

import history from '../history/history';

class Auth {
  accessToken;
  idToken;
  expiresAt;
  profile = {};

  constructor(options) {
    this.auth0 = new auth0.WebAuth(options);

    // Events
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    console.log('auth was invoked');
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log('))))))))))))))>>> ', err, authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult.accessToken);
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {
            this.profile = profile;
            console.log('profile------------------------------------>', profile);
            this.setSession(authResult);
          }
        });
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // navigate to the home route
    //history.replace('/main');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    this.setState({ loggedIn: false });
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  render() {
    return null;
  }
}

export default Auth;
