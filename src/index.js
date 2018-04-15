import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';


import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

injectTapEventPlugin();

ReactDOM.render((
  <Routes />
), document.getElementById('root'));

registerServiceWorker();
