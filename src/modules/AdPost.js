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

  getAdPost = adPostId => {
    const id = adPostId.trim();
    return axiosHelper.get(`/adPost/${id}`);
  }
}

export default new AdPost();
