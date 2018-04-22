import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../../modules/Auth';

import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
// import List, { ListItem, ListItemIcon } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import PageTitle from '../../../components/PageTitle';

import User from '../../../modules/User';
import AdPost from '../../../modules/AdPost';

import debugLog from '../../../utils/debug';

class UserDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      points: {},
      adPosts: []
    };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated.
      this.props.history.replace({ pathname: '/' });
    }
  }

  componentDidMount() {
    // this.loadUserPoints();
    this.loadUserAdPosts();
  }

  loadUserPoints = async () => {
    this.startLoading();
    const result = await User.getUserPoints();

    debugLog('User points loaded: ', result);

    if (result && result.data) this.setState({ points: result.data });

    this.endLoading();

  }

  loadUserAdPosts = async () => {
    this.startLoading();
    const result = await AdPost.getAdPostsByUser();

    debugLog('Ad Posts loaded', result);

    if (result && result.data) this.setState({ adPosts: result.data });

    this.endLoading();
  }

  startLoading = () => {
    if (!this.startLoading.loading) {
      this.setState({ loading: true }, () => debugLog('Loading: ', this.state.loading));
    }
  };

  endLoading = () => {
    if (this.state.loading) {
      this.setState({ loading: false }, () => debugLog('Loading: ', this.state.loading));
    }
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <PageTitle title="Dashboard" />

              <Grid container spacing={16}>
                <Grid item xs={12} style={{ border: '1px solid black' }}>
                  <Typography variant="title" align="right">
                  </Typography>
                </Grid>

                <Grid item xs={12} style={{ border: '1px solid black' }}>

                  <Grid container>
                    <Grid item xs={12} sm={8} style={{ border: '1px solid black' }}>
                    </Grid>


                    <Grid item xs={12} sm={4} style={{ border: '1px solid black' }}>

                      <Grid container justify="center">
                        <Grid item xs={12} style={{ border: '1px solid black', textAlign: 'center' }}>
                          <Link
                            to="/posts/new" params={{ id: '1' }}
                            style={{ color: 'inherit' }}
                          >
                            <Button
                              variant="raised" color="primary"
                              style={{ width: '100%', maxWidth: '240px', marginBottom: 16 }}
                            >
                              Create Ad
                            </Button>
                          </Link>
                        </Grid>


                        <Grid item xs={12} style={{ border: '1px solid black', textAlign: 'center' }}>
                          <Link to="/user/edit" style={{ color: 'inherit' }}>
                            <Button
                              variant="raised" color="default"
                              style={{ width: '100%', maxWidth: '240px' }}
                            >
                              Edit User
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default UserDashboardPage;
