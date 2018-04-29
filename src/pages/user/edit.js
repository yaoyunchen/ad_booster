import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import withUser from '../../hocs/withUser';

import debugLog from '../../utils/debug';
import UserModule from '../../modules/userModule';

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

  submitUser = async (e) => {
    e.preventDefault();

    try {
      const result = await UserModule.postUser(this.state.user);

      if (!result.success) {
        debugLog('submitUser Error: ', result);
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
  user: PropTypes.object
};

UserProfilePage.defaultProps = {
  user: {}
};

export default withUser(UserProfilePage);
