import { WebAuth } from 'auth0-js';
import history from './history.service';

export default class Auth {
  auth0 = new WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    audience: process.env.REACT_APP_AUTH0_AUDIANCE,
    responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
    scope: process.env.REACT_APP_AUTH0_SCOPE
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getParsedToken = this.getParsedToken.bind(this);
    this.getAuthorizationHeader = this.getAuthorizationHeader.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.error(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
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
    history.replace('/');
  }

  isAuthenticated(person) {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let valid = new Date().getTime() < expiresAt;
    let token = localStorage.getItem('id_token');
    if (!token) return false;
    let parsed = this.parseToken(token);
    let isMe = false;

    if (!person) isMe = true;
    else if (
      parsed.email +
        ''
          .toLocaleLowerCase()
          .indexOf(person.email + ''.toLocaleLowerCase()) !==
      -1
    ) {
      isMe = true;
    } else {
      isMe = false;
    }

    // console.log(valid && isMe);
    return true; //valid && isMe;
  }

  isAuthenticatedAsync() {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('token expired!');
        return;
      }

      let token = localStorage.getItem('id_token') || '';
      let parsed = this.parseToken(token);
      this.auth0.validateToken(token, parsed.nonce, (e, r) => {
        if (e) {
          reject(e);
          return;
        }

        resolve(r);
      });
    });
  }

  parseToken(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getParsedToken() {
    return this.isAuthenticated()
      ? this.parseToken(localStorage.getItem('id_token'))
      : this.login();
  }

  getAuthorizationHeader() {
    const token = localStorage.getItem('id_token');
    const authorizationHeader = token ? `Bearer ${token}` : null;
    return authorizationHeader;
  }
}
