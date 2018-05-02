import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import withUser from '../../hocs/withUser';

import debugLog from '../../utils/debug';
import UserModule from '../../modules/userModule';
import AuthModule from '../../modules/authModule';

import UserProfileForm from '../../components/Forms/userProfile';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user === nextProps.user) return;
    this.setUser(nextProps.user);
  }

  setUser = user => this.setState({ user });


  buildFormData = () => {
    const formData = new FormData();
    const { user } = this.state;
    const keys = Object.keys(user);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = user[key];

      formData.append(key, value);
    }

    formData.append('requesterId', AuthModule.getToken());

    return formData;
  };

  submitUser = async (e) => {
    e.preventDefault();

    try {
      const formData = this.buildFormData();
      const result = await UserModule.updateUser(formData);
      const { data } = result;

      if (!data.success) {
        debugLog('submitUser Error: ', result);
        return;
      }

      debugLog('submitUser: ', 'User updated');
      this.props.history.replace('/user');
    } catch (e) {
      debugLog('submitUser: Error: Unable to post ad', e);
    }
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

UserProfilePage.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
};

UserProfilePage.defaultProps = {
  user: {},
  history: {}
};

export default withUser(withRouter(UserProfilePage));
