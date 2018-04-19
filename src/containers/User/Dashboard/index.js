import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../../modules/Auth';

import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
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
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Dashboard
              </Typography>

              <Button variant="raised" color="primary">
                <Link to="/user/:id/posts/new" params={{ id: '1' }} style={{ color: 'inherit' }}>
                  Create Ad
                </Link>
              </Button>

              <Button variant="raised" color="primary" style={{ marginLeft: 16 }}>
                <Link to="/user/:id/edit" params={{ id: '1' }} style={{ color: 'inherit' }}>
                  Edit User
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default UserDashboardPage;
