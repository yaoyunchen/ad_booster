import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import App from './App';
import HomePage from './pages/home';

import SignUpPage from './pages/signUp';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';

import InfoPage from './pages/info';

import AdPostPage from './pages/adPosts/adPost';
import AdPostEditPage from './pages/adPosts/editAdPost';
import AdPostNewPage from './pages/adPosts/newAdPost';

import UserDashboardPage from './pages/user/dashboard';
import UserProfilePage from './pages/user/edit';

import AdminDashboardPage from './pages/admin/dashboard';

const Routes = () => (
  <Router>
    <App>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/signup" component={SignUpPage} />

        <Route path="/info" component={InfoPage} />

        <Route path="/post/:id/edit" component={AdPostEditPage} />
        <Route path="/post/:id" component={AdPostPage} />
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
