import AxiosHelper from '../helpers/axiosHelper';

const Axios = new AxiosHelper();

class User {
  getAll = () => Axios.get('/users');

  getUser = (id = null) => Axios.get(`/user?userId=${encodeURIComponent(id)}`);

  getUserIsAdmin = () => Axios.get('/user/isAdmin');

  getUserPoints = (id = null) => Axios.get(`/user/field?userId=${encodeURIComponent(id)}&field=points`);
}

export default User;
