import axios from 'axios';

import Auth from '../modules/Auth';
import debugLog from '../utils/debug';

class AxiosHelper {
  constructor() {
    const token = Auth.getToken();
    this.defaultHeaders = {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    };

    this.defaultOptions = {
      responseType: 'json'
    };
  }

  get(url, params, reqHeaders = {}, reqOptions = {}) {
    const headers = Object.assign({}, this.defaultHeaders, reqHeaders);
    const request = {
      method: 'get',
      params,
      url,
      headers
    };
    console.log('fucking requesst', request)

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
      body: params,
      data: params,
      params,
      url,
      headers
    };

    console.log(request);

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
      body: params,
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

export default AxiosHelper;
