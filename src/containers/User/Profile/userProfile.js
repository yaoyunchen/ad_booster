import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import UserProfileForm from '../../../components/Forms/UserProfile';
import Auth from '../../../modules/Auth';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: {}, errors: {} };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated.
      this.props.history.replace({ pathname: '/' });
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/user');

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);

    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({ user: xhr.response.data });
        return;
      };
    });

    xhr.send();
  }

  submitUser = (e) => {
    e.preventDefault();
    let encodedFormData = '';
    const keys = Object.keys(this.state.adPost);

    for (let i = 0; i < keys.length; i++) {
      const field = this.state.adPost[keys[i]];
      const data = encodeURIComponent(field);

      if (encodedFormData === '') {
        encodedFormData = `${keys[i]}=${data}`;
      } else {
        encodedFormData += `&${keys[i]}=${data}`;
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/user');
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

    xhr.send(encodedFormData);
  }

  updateUser = (field, value) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({ user });
  }


  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" color="primary" style={{ margin: '16px 0' }}>
                Edit Your Profile
              </Typography>

              <UserProfileForm
                errors={this.state.errors}
                user={this.state.user}
                onSubmit={this.submitUser}
                onChange={this.updateUser}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    );
  }
}

export default UserProfilePage;
