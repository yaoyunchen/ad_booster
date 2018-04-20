import Auth from './Auth';
import debugLog from '../utils/debug';

class User {
  getUserType = () => {
    return this._getUser()
      .then((res) => (res.data && res.data.accountType) || '')
      .catch((e) => debugLog('e', e));
  }

  // timeout = ms => (new Promise(resolve => setTimeout(resolve, ms)));

  getUserPoints = () => {
    return this._getUser()
      .then(res => (res.data && res.data.points) || 100)
      .catch((e) => debugLog('e', e));
  }

  getAll = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = 2000;
      xhr.ontimeout = () => reject('Time out');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          xhr.status === 200 ? resolve(xhr.response) : reject(xhr.status);
        }
      };

      xhr.open('get', '/users', true);

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';

      xhr.send();
    });
  }

  _getUser = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = 2000;
      xhr.ontimeout = () => reject('Time out');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          xhr.status === 200 ? resolve(xhr.response) : reject(xhr.status);
        }
      };

      xhr.open('get', '/user', true);

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';

      xhr.send();
    });
  }
}

export default new User();
