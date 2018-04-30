import AxiosHelper from '../helpers/axiosHelper';
import debugLog from '../utils/debug';

const Axios = new AxiosHelper();

const getAdPosts = (params = {}) => {
  let paramsUrl = '';
  const keys = Object.keys(params);

  keys.forEach((key, i) => {
    const value = encodeURIComponent(params[key]);
    paramsUrl += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return Axios.get(`/adPost/search${paramsUrl}`);
};

const getAdPostsWithSearch = (params = {}) => {
  if (Object.keys(params).length === 0) {
    debugLog('getAdPostsWithSearch': 'No params provided');
    return;
  }

  let paramsUrl = '';

  const keys = Object.keys(params);

  keys.forEach((key, i) => {
    const value = encodeURIComponent(params[key]);
    paramsUrl += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return Axios.get(`/adPost/search${paramsUrl}`);
};

const getAdPostsByUser = userId => {
  if (!userId) debugLog('getUser:', 'user Id was not provided, defaulting to request header.');

  return Axios.get(`/adPost/user?requesterId=${userId}`);
};

const getAdPost = adPostId => {
  if (!adPostId) {
    debugLog('getAdPost: ', 'adPostId is required.');
    return;
  }

  return Axios.get(`/adPost/adPost?adPostId=${encodeURIComponent(adPostId.trim())}`);
};

const getAdPostField = (adPostId, field) => {
  if (!field) {
    debugLog('getAdPostByField: ', 'field is required');
    return;
  }

  if (!adPostId) {
    debugLog('getAdPostByField: ', 'adPostId is required');
  }

  return Axios.get(`/adPost/field?adPostId=${encodeURIComponent(adPostId)}&field=${field}`);
};

const postAdPost = formData => {
  // for (const entry of formData.entries()) {
  //   debugLog({ key: entry[0], value: entry[1] });
  // }

  return Axios.post('/adPost', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

const updateAdPost = formData => {
  // for (const entry of formData.entries()) {
  //   debugLog({ key: entry[0], value: entry[1] });
  // }

  return Axios.put('/adPost', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

const boostAdPost = formData => {
  return Axios.put('/adPost/boost', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

const pinAdPost = formData => {
  return Axios.put('/adPost/pinned', formData, {
    'Content-Type': 'multipart/form-data'
  });
};

export default {
  getAdPosts,
  getAdPostsWithSearch,
  getAdPostsByUser,
  getAdPost,
  getAdPostField,
  postAdPost,
  updateAdPost,
  boostAdPost,
  pinAdPost
};
