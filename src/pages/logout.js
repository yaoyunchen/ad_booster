import React from 'react';

import Auth from '../modules/authModule';

class LogoutPage extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser();
    this.props.history.replace({ pathname: '/' });
  }

  render() {
    return <div />;
  }
}

export default LogoutPage;
