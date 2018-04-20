import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Auth from './modules/Auth';

import App from './App';
import HomePage from './containers/Home';
import LoginPage from './containers/Login';
import SignUpPage from './containers/SignUp';
import UserDashboardPage from './containers/User/Dashboard';
import AdminDashboardPage from './containers/Admin/Dashboard';
import AdPostPage from './containers/AdPost';
import ProfilePage from './containers/User/Profile';

class LogoutPage extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser();
    this.props.history.replace({ pathname: '/' });
  }

  render() {
    return <div />;
  }
}

const Routes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/posts/new" component={AdPostPage} />
        <Route path="/user/edit" component={ProfilePage} />
        <Route path="/user" component={UserDashboardPage} />
        <Route path="/admin" component={AdminDashboardPage} />
      </Switch>
    </App>
  </Router>
);


export default Routes;
