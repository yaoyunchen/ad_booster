import React from 'react';

import Auth from '../../modules/Auth';

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
