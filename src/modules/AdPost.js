import AxiosHelper from '../helpers/axiosHelper';

const Axios = new AxiosHelper();

class AdPost {
  getAdPosts = (params = {}) => {

    let paramsUrl = '';
    const keys = Object.keys(params);

    keys.forEach((key, i) => {
      const value = params[key];
      paramsUrl += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
    });

    return Axios.get(`/adPost${paramsUrl}`);
  }

  getAdPostsByUser = (userId = null) => Axios.get(`/adPost/userAdPosts?userId=${encodeURIComponent(userId)}`)

  getAdPost = adPostId => Axios.get(`/adPost/adpost?adPostId=${encodeURIComponent(adPostId.trim())}`);
}

export default AdPost;
