import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../modules/Auth';
import LoginForm from '../../components/Forms/Login';

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
        username: '',
        password: ''
      }
    };
  }

  processForm = (e) => {
    e.preventDefault();

    const { user } = this.state;

    // create a string for an HTTP body message
    const username = encodeURIComponent(user.username);
    const password = encodeURIComponent(user.password);
    const formData = `username=${username}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({ errors: {} });

        Auth.authenticateUser(xhr.response.token);
        this.props.history.replace('/user');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
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
