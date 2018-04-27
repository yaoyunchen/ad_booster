import AxiosHelper from '../helpers/axiosHelper';

const Axios = new AxiosHelper();

class User {
  getAll = () => Axios.get('/users');

  getUser = (id = null) => Axios.get(`/user?id=${encodeURIComponent(id)}`);

  getUserIsAdmin = () => Axios.get('/user/isAdmin');

  getUserPoints = (id = null) => Axios.get(`/user/points?id=${encodeURIComponent(id)}`);
}

export default User;
