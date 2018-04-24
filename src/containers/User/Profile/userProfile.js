import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../../modules/Auth';
import User from '../../../modules/User';
import debugLog from '../../../utils/debug';
import axiosHelper from '../../../helpers/axiosHelper';

import UserProfileForm from '../../../components/Forms/UserProfile';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null, errors: {}
    };
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

  loadUser = async () => {
    const result = await User.getUser();
    debugLog('User loaded', result);
    if (result && result.data) this.setState({ user: result.data });
  }

  submitUser = (e) => {
    e.preventDefault();

    axiosHelper.put('/auth/user/edit', this.state.user)
      .then((res) => {
        if (res && res.data && !res.data.success) {
          const { errors, message } = res.data;
          errors.summary = message;

          this.setState({ errors: errors || {} });
          return;
        }

        debugLog('User updated.');
        this.setState({ errors: {} });

        sessionStorage.setItem('globalMessage', res.data.message);
        this.props.history.replace('/user');
      })
      .catch(e => {
        debugLog(e);
      });

    // let encodedFormData = '';
    // const keys = Object.keys(this.state.adPost);

    // for (let i = 0; i < keys.length; i++) {
    //   const field = this.state.adPost[keys[i]];
    //   const data = encodeURIComponent(field);

    //   if (encodedFormData === '') {
    //     encodedFormData = `${keys[i]}=${data}`;
    //   } else {
    //     encodedFormData += `&${keys[i]}=${data}`;
    //   }
    // }

    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/user');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';

    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({ errors: {} });

    //     localStorage.setItem('successMessage', xhr.response.message);
    //     this.props.history.replace('/login');
    //   } else {
    //     // failure

    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({ errors });
    //   }
    // });

    // xhr.send(encodedFormData);
  }

  updateUser = (field, value) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({ user });
  }


  render() {
    if (!this.state.user) return <div />;

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
