import React from 'react';

import Auth from '../../../modules/Auth';
import Dashboard from '../../../components/Dashboard';

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

// class DashboardPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       secretData: ""
//     };
//   }

//   componentWillMount() {
//     if (!Auth.isUserAuthenticated()) {
//       this.props.history.replace({ pathname: '/' });
//     }
//   }

//   componentDidMount() {
//     const xhr = new XMLHttpRequest();

//     xhr.open('get', '/api/dashboard');
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
//     xhr.responseType = 'json';

//     xhr.addEventListener('load', () => {
//       if (xhr.status === 200) {
//         this.setState({
//           secretData: xhr.response.message
//         });
//       }
//     });

//     xhr.send();
//   }

//   render() {
//     return <Dashboard secretData={this.state.secretData} />;
//   }
// }

export default UserDashboardPage;
