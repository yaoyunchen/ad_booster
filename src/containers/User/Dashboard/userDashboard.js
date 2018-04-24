import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../../modules/Auth';

import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import PageTitle from '../../../components/PageTitle';

import User from '../../../modules/User';
import AdPost from '../../../modules/AdPost';

import debugLog from '../../../utils/debug';
import { convertDate } from '../../../helpers/contentHelper';

class UserDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      adPosts: null
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
    this.loadUserAdPosts();
  }

  loadUser = async () => {
    this.startLoading();
    const result = await User.getUser();

    debugLog('User loaded: ', result.data);

    if (result && result.data) {
      this.setState({ user: result.data }, () => this.endLoading());
    }
  }

  loadUserAdPosts = async () => {
    this.startLoading();
    const result = await AdPost.getAdPostsByUser();

    debugLog('Ad Posts loaded', result);

    if (result && result.data) {
      this.setState({ adPosts: result.data }, () => this.endLoading());
    }
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
    const { user, adPosts } = this.state;
    if (!user) return <div />;

    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <PageTitle title="Dashboard" />

              <Grid container spacing={16}>
                {/* Headers */}
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="title" gutterBottom>
                        Welcome, {user.username}.
                      </Typography>

                      <Typography variant="subheading">
                        Last Login: {convertDate(user.dateCreated)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="title" align="right" color={user.points && user.points > 0 ? 'primary' : 'secondary'}>
                        Points: {user.points || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Control buttons */}
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}
                      style={{
                        textAlign: isTabletUp ? 'right' : 'center'
                      }}
                    >
                      <Link
                        to="/posts/new"
                        style={{
                          color: 'inherit',
                          marginRight: isTabletUp ? 16 : 0
                        }}
                      >
                        <Button
                          variant="raised" color="primary"
                          style={{
                            width: !isTabletUp ? '100%' : 'auto',
                            maxWidth: !isTabletUp ? 208 : 'none',
                            marginBottom: isTabletUp ? 0 : 16
                          }}
                        >
                          Create Ad
                        </Button>
                      </Link>


                      <Link
                        to="/user"
                        style={{
                          color: 'inherit',
                          marginRight: isTabletUp ? 16 : 0
                        }}
                      >
                        <Button
                          variant="raised" color="secondary"
                          style={{
                            width: !isTabletUp ? '100%' : 'auto',
                            maxWidth: !isTabletUp ? 208 : 'none',
                            marginBottom: isTabletUp ? 0 : 16
                          }}
                        >
                          Refill Points
                        </Button>
                      </Link>

                      <Link
                        to="/user/edit"
                        style={{
                          color: 'inherit'
                        }}
                      >
                        <Button
                          variant="raised" color="default"
                          style={{
                            width: !isTabletUp ? '100%' : 'auto',
                            maxWidth: !isTabletUp ? 208 : 'none'
                          }}
                        >
                          Edit User
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Ad Posts */}
                <Grid item xs={12} style={{ border: '1px solid black' }}>

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
