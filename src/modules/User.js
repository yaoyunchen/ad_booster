import Auth from './Auth';

import axiosHelper from '../helpers/axiosHelper';


class User {
  getAll = () => axiosHelper.get('/users');

  getUser = (id = null) => axiosHelper.get(`/user?id=${encodeURIComponent(id)}`);

  getUserIsAdmin = () => axiosHelper.get('/user/isAdmin');

  getUserPoints = (id = null) => axiosHelper.get(`/user/points?id=${encodeURIComponent(id)}`);
}

export default new User();
