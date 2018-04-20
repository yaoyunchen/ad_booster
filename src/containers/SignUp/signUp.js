import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SignUpForm from '../../components/Forms/SignUp';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      }
    };
  }

  processForm = (e) => {
    e.preventDefault();
    const { user } = this.state;

    // create a string for an HTTP body message
    const firstname = encodeURIComponent(user.firstname);
    const lastname = encodeURIComponent(user.lastname);
    const username = encodeURIComponent(user.username);
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);

    const formData = `firstname=${firstname}&lastname=${lastname}&username=${username}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({ errors: {} });

        localStorage.setItem('successMessage', xhr.response.message);
        this.props.history.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({ errors });
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
                Sign Up
              </Typography>

              <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default SignUpPage;
