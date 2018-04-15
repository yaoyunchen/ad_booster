import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import App from './App';
import HomePage from './containers/Home';
import LoginPage from './containers/Login';
import SignUpPage from './containers/SignUp';
import DashboardPage from './containers/Dashboard';

import Auth from './modules/Auth';

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
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
    </App>
  </Router>
);


export default Routes;
