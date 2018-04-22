import axiosHelper from '../helpers/axiosHelper';

class AdPost {
  getAdPosts = (params = {}) => {
    let paramsUrl = '';
    const keys = Object.keys(params);

    keys.forEach((key, i) => {
      const value = params[key];
      paramsUrl += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
    });

    return axiosHelper.get(`/adPost${paramsUrl}`);
  }

  getAdPostsByUser = (userId = null) => axiosHelper.get(`/adPost/userAdPosts?userId=${encodeURIComponent(userId)}`)

  getAdPost = adPostId => axiosHelper.get(`/adPost/${encodeURIComponent(adPostId.trim())}`);
}

export default new AdPost();
