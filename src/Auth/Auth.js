// src/Auth/Auth.js

import auth0 from 'auth0-js';

import history from '../history/history';

class Auth {
  

    auth0 = new auth0.WebAuth({
    domain: 'livello.eu.auth0.com',
    clientID: 'wEXl6yLJ33YI4rIoH4HeJFeQuzNAIs2s',
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/main' : 'https://livello-mission-control-v01.netlify.com/main',    
    responseType: 'token id_token',
    scope: 'openid profile email admin',
    audience: 'https://livello-backend/api',
  });  
    
  
  constructor(props) {
    this.profileN = {};
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }  
  
  login() {
    this.auth0.authorize(); 
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) { 
        console.log(authResult.accessToken);
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {            
            this.profileN = profile;
            console.log('profile------------------------------------>',profile);
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
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
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
  
}

export default Auth;