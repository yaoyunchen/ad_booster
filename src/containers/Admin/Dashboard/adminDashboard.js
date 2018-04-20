import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../../../modules/Auth';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import debugLog from '../../../utils/debug';

import User from '../../../modules/User';

import PageTitle from '../../../components/PageTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '100%'
  },
  gridList: {
    width: '100%',
    height: 200,
  },
  subheader: {
    width: '100%',
  },
});

const mockUsers = [
  {
    id: '5ad44fa6f1b086c9f3dd5468',
    firstname: 'Test',
    middlename: '',
    lastname: 'Tester',
    accountType: 'user',
    photo: '/assets/images/user/5ad44fa6f1b086c9f3dd5468.png',
    createdAt: '04/19/2018 12:15pm'
  },
  {
    id: '5ad452326f292bcabe0f295a',
    firstname: 'Andy',
    middlename: '',
    lastname: 'Yao',
    accountType: 'user',
    photo: '/assets/images/user/5ad452326f292bcabe0f295a.png',
    createdAt: '04/07/2018 12:40pm'
  },
  {
    id: '5ad5869670fe191996e5852c',
    firstname: 'Admin',
    middlename: '',
    accountType: 'admin',
    lastname: 'Instrator',
    photo: '/assets/images/user/5ad5869670fe191996e5852c.png',
    createdAt: '04/01/2018 1:20am'
  }
];

const mockAdPosts = [];

class AdminDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { usersLoading: true, adPostsLoading: true };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated
      this.props.history.replace({ pathname: '/' });
    }
  }

  componentDidMount() {
    this.isUserAdmin();
  }

  isUserAdmin = async () => {
    this.startLoading();
    const userType = await User.getUserType();
    if (userType !== 'admin') this.props.history.replace({ pathname: '/' });
    this.endLoading();
  }

  startLoading = () => {
    this.setState({ loading: true });
    debugLog('Page loading: ', this.state.loading);
  }

  endLoading = () => {
    this.setState({ loading: false });
    debugLog('Page loading: ', this.state.loading);
  }

  stopUserLoading = () => {
    this.setState({ usersLoading: false });
  }

  getUserList = () => {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={100} cols={1}
          className={classes.gridList}
        >
          {mockUsers.map(user => {
            let userName = user.firstname;
            if (user.middlename) userName += ` ${user.middlename}`;
            userName += ` ${user.lastname}`;

            return (
              <GridListTile key={user.id} style={{ border: '1px solid red' }}>
                <Grid container>
                  <Grid item xs={3} style={{ border: '1px solid blue' }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
                    >
                      <img
                        alt={userName}
                        src={`${process.env.PUBLIC_URL}${user.photo}`}
                        style={{ width: 60, height: 'auto', borderRadius: '10%' }}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={9} style={{ border: '1px solid blue' }}>
                    <Typography style={{ height: 75 }}>
                      <b>Name:</b> {userName}
                      <b>Points: </b>
                    </Typography>
                  </Grid>
                </Grid>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }

  stopAdPostLoading = () => {
    this.setState({ adPostsLoading: false });
  }

  getAdPostList = () => {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={100} cols={1}
          className={classes.gridList}
        >
          {mockUsers.map(item => {
            return (
              <GridListTile key={item.id}>
                <Typography style={{ height: 75 }}>
                  {`${item.firstname} ${item.lastname}`}
                </Typography>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }

  render() {
    return (
      <Grid container justify="center" style={{ border: '1px solid lightgrey' }}>
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <PageTitle title="Admin Dashboard" />

              <Grid container>
                <Grid item xs={12} md={6} style={{ border: '1px solid black' }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ height: 60, border: '1px solid black' }}>
                        Filter / Search bar here
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      {this.getUserList()}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} style={{ border: '1px solid black' }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ height: 60, border: '1px solid black' }}>
                        Filter / Search bar here
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      {this.getAdPostList()}
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

AdminDashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminDashboardPage);
