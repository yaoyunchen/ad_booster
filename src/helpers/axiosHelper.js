import axios from 'axios';

import Auth from '../modules/Auth';
import debugLog from '../utils/debug';

class AxiosHelper {
  constructor() {
    this.defaultHeaders = {
      'Authorization': `bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json; charset=utf-8'
    };

    this.defaultOptions = {
      responseType: 'json'
    };
  }

  get(url, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'get',
      url,
      headers
    };

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => {
        return response.data;
      })
      .catch(error => debugLog(error));
  }

  post(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'post',
      params,
      url,
      headers
    };

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => response.data)
      .catch(err => {
        debugLog('POST ERROR:', err);
        return err.response;
      });
  }

  put(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'put',
      params,
      url,
      headers
    };


    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => response.data)
      .catch(err => {
        debugLog('PUT ERROR:', err);
        return err.response;
      });
  }
}

export default new AxiosHelper();
