import axios from 'axios';

import AuthModule from '../modules/authModule';
import debugLog from '../utils/debug';

class AxiosHelper {
  constructor() {
    const token = AuthModule.getToken();
    this.defaultHeaders = {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    };

    this.defaultOptions = { responseType: 'json' };
  }

  get(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);
    const request = { method: 'get', params, url, headers };

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => response)
      .catch(err => {
        debugLog('axiosHelper.get Error: ', err.response);
        return err.response;
      });
  }

  post(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'post', data: params, url, headers
    };

    // for (const entry of params.entries()) {
    //   console.log({ key: entry[0], value: entry[1] });
    // }

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => response)
      .catch(err => {
        debugLog('axiosHelper.post Error: ', err.response);
        return err.response;
      });
  }

  put(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);

    const request = {
      method: 'put', data: params, url, headers
    };

    return axios(Object.assign({}, request, this.defaultOptions, reqOptions))
      .then(response => response)
      .catch(err => {
        debugLog('axiosHelper.put Error: ', err.response);
        return err.response;
      });
  }
}

export default AxiosHelper;
