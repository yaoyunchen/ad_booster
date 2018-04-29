import AxiosHelper from '../helpers/axiosHelper';

const Axios = new AxiosHelper();

const postRefillRequest = formData => {
  return Axios.post('/request', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

export default {
  postRefillRequest
};
