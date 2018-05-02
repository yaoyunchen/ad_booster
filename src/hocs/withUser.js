import React from 'react';

import Grid from 'material-ui/Grid';

import AuthModule from '../modules/authModule';
import UserModule from '../modules/userModule';

import debugLog from '../utils/debug';

function withUser(WrappedComponent) {
  class UserWrapper extends React.Component {
    constructor(props) {
      super(props);

      if (!AuthModule.isUserAuthenticated()) {
        props.history.replace({ pathname: '/' });
      }

      this.state = {
        user: null,
        userLoading: false
      };
    }

    componentDidMount() {
      this.loadUser();
    }

    loadUser = async () => {
      try {
        this.startUserLoading();
        const result = await UserModule.getUser(AuthModule.getToken());

        const { data } = result;
        if (data && data.data) {
          debugLog('loadUser (Success): ', data.data);
          this.setState({ user: data.data });
        } else {
          debugLog('loadUser (Error): ', result);
        }

        this.endUserLoading();
      } catch (e) {
        debugLog('loadUser (Error): ', e);
        this.endUserLoading();
      }
    }

    startUserLoading = () => {
      if (!this.state.userLoading) {
        this.setState({ userLoading: true });
      }
    }

    endUserLoading = () => {
      if (this.state.userLoading) {
        this.setState({ userLoading: false });
      }
    }

    render() {
      return (
        <Grid container justify="center">
          <Grid item xs={12}>
            <WrappedComponent {...this.state} />
          </Grid>
        </Grid>
      );
    }
  }

  return UserWrapper;
};

export default withUser;
