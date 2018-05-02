import debugLog from '../utils/debug';

const authenticateUser = (token) => {
  debugLog('SETTING AUTH TOKEN', token);
  localStorage.setItem('token', token);
  return true;
};

const isUserAuthenticated = () => localStorage.getItem('token') !== null;

const deauthenticateUser = () => {
  debugLog('REMOVE AUTH TOKEN');
  localStorage.removeItem('token');
  return true;
}

const getToken = () => localStorage.getItem('token');

export default {
  authenticateUser,
  deauthenticateUser,
  isUserAuthenticated,
  getToken
};
