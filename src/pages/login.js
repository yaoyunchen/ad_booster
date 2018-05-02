import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import debugLog from '../utils/debug';
import AuthModule from '../modules/authModule';
import UserModule from '../modules/userModule';
import { buildFormData } from '../helpers/formHelper';

import LoginForm from '../components/Forms/logIn';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        username: '', password: ''
      }
    };
  }

  setErrors = (data) => {
    const { errors } = data;
    errors.summary = data.message;
    this.setState({ errors });
  }

  processForm = async (e) => {
    e.preventDefault();

    try {
      const formData = buildFormData(this.state.user);
      const result = await UserModule.loginUser(formData);
      const { data } = result;

      if (!data.success) {
        debugLog('processForm errors:', result);
        this.setErrors(data);
        return;
      }

      this.setState({ errors: {} });
      const authenticated = await AuthModule.authenticateUser(data.token);

      if (authenticated) this.props.history.replace('/user');
    } catch (e) {
      debugLog('processForm failed:', e);
    }
  }

  changeUser = (field, value) => {
    const user = this.state.user;
    user[field] = value;

    this.setState({ user });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Log In
              </Typography>

              <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default LoginPage;
