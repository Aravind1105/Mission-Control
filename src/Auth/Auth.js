// src/Auth/Auth.js

import auth0 from 'auth0-js';

import history from '../history/history';

class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'livello.eu.auth0.com',
    clientID: '6FR5l1cSodGrWJq3o3SVNm7zWY35oMKt',
    redirectUri: 'http://localhost:3000/main',    
    responseType: 'token id_token',
    scope: 'openid profile'
  });  
  
  constructor(props) {
    this.userProfile = {}
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

        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {
            console.log('auth profile ------------------------------------>',profile['family_name']);           
            this.userProfile = profile; 
          }
          else {
            console.log('error------------------------------------>')
          }
        });
             
        this.setSession(authResult);          
        
        history.replace('/main');
        
      } else if (err) {        
        history.replace('/');
        
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    console.log('set session........................');   
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    
    // navigate to the home route
    history.replace('/');    
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