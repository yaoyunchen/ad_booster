import React from 'react';

import Auth from '../../../modules/Auth';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class UserDashboardPage extends React.Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated.
      this.props.history.replace({ pathname: '/' });
    }
  }

  render() {
    return (
      <Grid container justify="center" style={{ margin: '32px 16px' }}>
        <Typography variant="headline" gutterbottom="true">
          Dashboard
        </Typography>
      </Grid>
    );
  }
}

export default UserDashboardPage;
