import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../../modules/Auth';

import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import PageTitle from '../../../components/PageTitle';

// import UserModule from '../../../modules/User';
// import AdPostModule from '../../../modules/AdPost';

import AxiosHelper from '../../../helpers/axiosHelper';

import debugLog from '../../../utils/debug';
import { convertDate } from '../../../helpers/contentHelper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '80vh'
  },
  gridList: {
    width: '100%',
    height: '100%',
    marginRight: '-15px !important',
    padding: '1px 15px 1px 1px'
  },
  subheader: {
    width: '100%'
  }
});

class UserDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
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
    this.loadUser();
    this.loadUserAdPosts();
  }

  loadUser = async () => {
    this.startLoading();
    // const User = new UserModule();
    // const result = await User.getUser();
    const Axios = new AxiosHelper();
    const result = await Axios.get(`/user?userId=${Auth.getToken()}`)

    debugLog('User loaded: ', result.data);

    if (result && result.data) {
      this.setState({ user: result.data }, () => this.endLoading());
    }
  }

  loadUserAdPosts = async () => {
    this.startLoading();
    // const AdPost = new AdPostModule();
    // const result = await AdPost.getAdPostsByUser();
    const Axios = new AxiosHelper();
    const result = await Axios.get(`/adPost?createdBy=${Auth.getToken()}`);

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

  buildImageElement = (adPost) => {
    const { photos } = adPost;

    let size = 60;
    if (window && window.matchMedia("(min-width: 600px)").matches) {
      size = 80;
    }

    if (!photos || photos.length === 0) {
      return (
        <Icon style={{
          fontSize: size,
          color: '#c1c1c1',
          border: '2px solid rgb(63, 81, 181, 0.15)',
          borderRadius: 5,
          overflow: 'hidden'
        }}>
          person_outline
      </Icon>
      );
    }

    // const photo = photos[0]
    const photo = `${process.env.PUBLIC_URL}/assets/images/adPost/1.png`;

    return (
      <div
        style={{
          position: 'relative',
          float: 'left',
          width: size,
          height: size,
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(${photo})`,
          border: '2px solid rgb(63, 81, 181, 0.15)',
          borderRadius: 5
        }}
      />
    )
  }

  buildListElements = () => {
    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    return this.state.adPosts.map((adPost) => {
      const imageEle = this.buildImageElement(adPost);

      return [
        <GridListTile key={adPost._id} style={{
          height: isTabletUp ? 120 : 'auto',
          padding: isTabletUp ? 0 : '8px',
          margin: '8px 0',
          border: '2px solid #3f51b5',
          borderRadius: 5
        }}>
          <Grid
            container alignItems="center" style={{ height: '100%' }}
          >
            <Grid item xs={12} sm={3} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'middle'
            }}>
              {imageEle}
            </Grid>

            <Grid item xs={12} sm={5}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="title"
                    style={{
                      margin: isTabletUp ? 0 : '12px 0'
                    }}
                  >
                    {adPost.title}
                  </Typography>
                </Grid>

                <Grid item xs={12}
                  style={{
                    maxHeight: 96,
                    overflow: 'hidden'
                  }}
                >
                  <Typography
                    variant="subheading"
                    style={{
                      marginBottom: isTabletUp ? 0 : 12
                    }}
                  >
                    {adPost.desc}
                  </Typography>

                  <Grid item xs={12}>
                    <Typography variant="caption">
                      {`${adPost.city} - ${adPost.region} - ${new Date(adPost.dateCreated).toLocaleString()}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}
              style={{ marginTop: isTabletUp ? 0 : 16 }}
            >
              <Grid container spacing={8}>
                <Grid item xs={6} sm={6} style={{ textAlign: 'center' }}>
                  <Button variant="raised" color="primary">
                    Boost
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} style={{ textAlign: 'center' }}>
                  <Button variant="raised" color="secondary">
                    Pin
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} style={{ textAlign: 'center' }}>
                  <Link to={`/post/${adPost._id}/edit`}>
                    <Button variant="raised">
                      Edit
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </GridListTile>,
        <Divider key={`${adPost.id}-divider`} style={{
          height: 2,
          padding: 0,
          backgroundColor: '#eaeaea'
        }} />
      ];
    });
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    if (!user) return <div />;

    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <PageTitle title="Dashboard" />

              <Grid container spacing={16} justify="center">
                {/* Headers */}
                <Grid item xs={12} lg={10}>
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

                <Grid item xs={12} lg={10}>
                  <Divider />
                </Grid>

                {/* Control buttons */}
                <Grid item xs={12} lg={10}>
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

                <Grid item xs={12} lg={10}>
                  <Divider />
                </Grid>

                {/* Ad Posts */}
                <Grid item xs={12} lg={10} style={{ border: '1px solid black' }}>
                  <div className={classes.root}>
                    <GridList cellHeight={100} cols={1} className={classes.gridList}>
                      {this.buildListElements()}
                    </GridList>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(UserDashboardPage);
