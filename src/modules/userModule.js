import AuthModule from './authModule';
import AxiosHelper from '../helpers/axiosHelper';
import debugLog from '../utils/debug';

const Axios = new AxiosHelper();

const getAllUsers = () => Axios.get('/users');

const getUser = userId => {
  if (!userId) debugLog('getUser: ', 'user Id was not provided, defaulting to request header.');
  return Axios.get(`/user?userId=${encodeURIComponent(userId)}`);
};

const getUserField = (userId, field) => {
  if (!field) {
    debugLog('getUserField: ', 'field is required.');
    return;
  }
  if (!userId) debugLog('getUser: ', 'user Id was not provided, defaulting to request header.');

  return Axios.get(`/user/field?userId=${encodeURIComponent(userId)}&field=${field}`);
}

const getUserIsAdmin = () => Axios.get(`/user/isAdmin`, null, { 'Authorization': `bearer ${AuthModule.getToken()}`,});

const getUserPoints = id => getUserField(id, 'points');

const postUser = formData => {
  return Axios.post('/auth/signup', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

const updateUser = formData => {
  return Axios.put('/user', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

const loginUser = formData => {
  return Axios.post('/auth/login', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

export default {
  getAllUsers,
  getUser,
  getUserField,
  getUserIsAdmin,
  getUserPoints,
  postUser,
  updateUser,
  loginUser
};
