import axios from 'axios';

import debugLog from '../utils/debug';

class AxiosHelper {
  constructor() {
    this.defaultHeaders = {
      // 'Content-type': 'application/x-www-form-urlencoded'
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

  post(url, data, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'post',
      data,
      url,
      headers
    };

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => {
        return response.data;
      })
      .catch(error => debugLog(error));
  }
}

export default new AxiosHelper();
