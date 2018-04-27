import React from 'react';

import Auth from '../../../modules/Auth';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';

import debugLog from '../../../utils/debug';
import UserModule from '../../../modules/User';

import PageTitle from '../../../components/PageTitle';
import { AdminAdPostList, AdminUserList } from '../../../components/Lists/Admin';

const mockUsers = [
  {
    id: '5ad44fa6f1b086c9f3dd5468',
    firstname: 'Test',
    middlename: '',
    lastname: 'Testerasdsadasdasdassadsasadsad',
    accountType: 'user',
    emailConfirmed: false,
    points: 0,
    photo: '/assets/images/user/5ad44fa6f1b086c9f3dd5468.png',
    createdAt: '04/19/2018 12:15pm'
  },
  {
    id: '5ad452326f292bcabe0f295a',
    firstname: 'Andy',
    middlename: '',
    lastname: 'Yao',
    accountType: 'user',
    points: 450,
    emailConfirmed: true,
    photo: '/assets/images/user/5ad452326f292bcabe0f295a.png',
    createdAt: '04/07/2018 12:40pm'
  },
  {
    id: '5ad5869670fe191996e5852c',
    firstname: 'Admin',
    middlename: '',
    accountType: 'admin',
    points: 1000,
    lastname: 'Instrator',
    emailConfirmed: true,
    photo: '/assets/images/user/5ad5869670fe191996e5852c.png',
    createdAt: '04/01/2018 1:20am'
  }
];

const mockAdPosts = [
  {
    id: '1',
    title: 'This is the Title',
    subtitle: 'This is the subtitle',
    createdAt: '04/20/2017 12:50am',
    visits: 0,
    replies: 0,
    region: 'Greater Vancouver',
    province: 'BC',
    expired: false,
    user: {
      firstname: 'Test',
      lastname: 'Tester'
    },
    photos: [
      '/assets/images/adPost/1.png'
    ]
  },
  {
    id: '2',
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    createdAt: '04/20/2017 12:00am',
    visits: 5,
    replies: 0,
    region: 'Greater Vancouver',
    province: 'BC',
    expired: false,
    user: {
      firstname: 'Test',
      lastname: 'Tester'
    },
    photos: [
      '/assets/images/adPost/1.png'
    ]
  },
  {
    id: '3',
    title: 'Title 3',
    subtitle: 'Subtitle 3',
    createdAt: '04/10/2017 1:23pm',
    visits: 29,
    replies: 4,
    region: 'Richmond',
    province: 'BC',
    expired: true,
    user: {
      firstname: 'Andy',
      lastname: 'Yao'
    },
    photos: [
      '/assets/images/adPost/1.png'
    ]
  }
];

class AdminDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAdmin: null
    };
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

  componentWillUpdate(nextProps, nextState) {
    if (this.state.isAdmin !== nextState.isAdmin && !nextState.isAdmin) {
      debugLog('User is not an admin.');
      this.props.history.replace({ pathname: '/' });
    }
  }

  isUserAdmin = async () => {
    this.startLoading();

    const User = new UserModule();
    const userType = await User.getUserIsAdmin();

    if (userType && userType.data) {
      this.setState({ isAdmin: userType.data });
    }
    this.endLoading();
  }

  startLoading = () => {
    this.setState({ loading: true }, () => {
      debugLog('Page loading: ', this.state.loading);
    });
  }

  endLoading = () => {
    this.setState({ loading: false }, () => {
      debugLog('Page loading: ', this.state.loading);
    });
  }

  handleDialogOpen = (e, data) => {
    e.preventDefault();
    this.setState({ dialogOpen: true, dialogData: data });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  }

  render() {
    return [
      <Grid container justify="center" key="body">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <PageTitle title="Admin Dashboard" />

              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <AdminUserList
                    users={mockUsers}
                    onManageClick={this.handleDialogOpen}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <AdminAdPostList
                    adPosts={mockAdPosts}
                    onManageClick={this.handleDialogOpen}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    ];
  }
}

export default AdminDashboardPage;
