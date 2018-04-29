import AxiosHelper from '../helpers/axiosHelper';
import debugLog from '../utils/debug';

const Axios = new AxiosHelper();

const getAdPosts = (params = {}) => {
  let paramsUrl = '';
  const keys = Object.keys(params);

  keys.forEach((key, i) => {
    const value = params[key];
    paramsUrl += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return Axios.get(`/adPost${paramsUrl}`);
};

const getAdPostsByUser = userId => {
  if (!userId) debugLog('getUser:', 'user Id was not provided, defaulting to request header.');

  return Axios.get(`/adPost?createdBy=${encodeURIComponent(userId)}`);
};

const getAdPost = adPostId => {
  if (!adPostId) {
    debugLog('getAdPost: ', 'adPostId is required.');
    return;
  }
  return Axios.get(`/adPost/adpost?adPostId=${encodeURIComponent(adPostId.trim())}`);
};

export default {
  getAdPosts,
  getAdPostsByUser,
  getAdPost
};
