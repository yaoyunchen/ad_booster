import React from 'react';

import Auth from '../../../modules/Auth';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class AdminDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { admin: null };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated
      this.props.history.replace({ pathname: '/' });
    }

    this.isUserAdmin();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!this.state.admin) {
      this.props.history.replace({ pathname: '/' });
    }
  }

  isUserAdmin = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/user/isAdmin');

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);

    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          admin: xhr.response.data
        });
        return;
      };
    });

    xhr.send();
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Admin Dashboard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AdminDashboardPage;
