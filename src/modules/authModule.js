import debugLog from '../utils/debug';

class Auth {
  static authenticateUser(token) {
    debugLog('SETTING AUTH TOKEN', token);
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    debugLog('REMOVE AUTH TOKEN');
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
