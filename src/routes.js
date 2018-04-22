import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import App from './App';
import HomePage from './containers/Home';

import SignUpPage from './containers/SignUp';
import LoginPage from './containers/Login';
import LogoutPage from './containers/Logout';

import UserDashboardPage from './containers/User/Dashboard';
import UserProfilePage from './containers/User/Profile';

import AdminDashboardPage from './containers/Admin/Dashboard';

import AdPostPage from './containers/AdPosts/AdPost';
import AdPostNewPage from './containers/AdPosts/New';

const Routes = () => (
  <Router>
    <App>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/signup" component={SignUpPage} />

        <Route path="/post/:id" component={AdPostPage}/>
        <Route path="/posts/new" component={AdPostNewPage} />

        <Route path="/user/edit" component={UserProfilePage} />
        <Route path="/user" component={UserDashboardPage} />
        <Route path="/admin" component={AdminDashboardPage} />

        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </Router>
);


export default Routes;
