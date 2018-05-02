import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Routes from './routes';
// import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

const theme = createMuiTheme({
  palette: {
    type: 'light'
  },
});

injectTapEventPlugin();

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>
), document.getElementById('root'));

// registerServiceWorker();
