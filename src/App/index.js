import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import AxiosHelper from '../helpers/axiosHelper';
import Auth from '../modules/Auth';
import debugLog from '../utils/debug';

import RegionSelectDialog from '../components/Dialogs/RegionSelect';
import DisclaimerDialog from '../components/Dialogs/Disclaimer';

import './App.scss';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    const province = localStorage.getItem('province');
    const disclaimer = sessionStorage.getItem('disclaimer');

    this.state = {
      showRegion: !province && disclaimer === 'true' ? true : false,
      province,
      disclaimer: disclaimer === 'true' ? true : false,
      admin: null,
      user: Auth.getToken(),
      menu: null
    };
  }

  componentDidMount() {
    this.checkRegionRequired();
    Auth.isUserAuthenticated() && this.checkIfUserAdmin();
  }

  componentWillUpdate() {
    const { user, admin } = this.state;
    if (!Auth.isUserAuthenticated()) {
      console.log('fucking user is not authenticated');
      this.removeUserInfo();
      return;
    }

    console.log('Fucker is authenticated');
    if (Auth.isUserAuthenticated && (user !== Auth.getToken() || user === null || admin === null)) {
      this.checkIfUserAdmin();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    try {
      if (this.context.router.route.location.pathname !==
        nextContext.router.route.location.pathname) {
        this.checkRegionRequired();
      }
    } catch (e) {
      debugLog('Error loading context router pathname', e);
      this.setState({ showRegion: true });
    }
  }

  getChildContext() {
    return { province: this.state.province };
  }

  removeUserInfo = () => {
    const { user, admin } = this.state;

    if (user || admin) this.setState({ user: null, admin: null });
  }

  onRegionChangeClick = (province) => {
    this.setState({ province, showRegion: false });
  }

  onDisclaimerAgreeClick = () => {
    sessionStorage.setItem('disclaimer', true);
    this.setState({ disclaimer: true }, () => {
      this.checkRegionRequired();
    });
  }

  onDisclaimerDisagreeClick = () => this.context.router.history.goBack()

  closeRegionSelect = () => this.setState({ showRegion: false })

  openRegionSelect = () => this.setState({ showRegion: true })

  checkIfUserAdmin = async () => {
    const response = await AxiosHelper.get('/user/isAdmin', { 'Authorization': `bearer ${Auth.getToken()}` });

    if (response && response.data) {
      this.setState({ admin: response.data, user: Auth.getToken() });
    } else {
      this.setState({ admin: false, user: Auth.getToken() });
    }
  }

  checkRegionRequired = () => {
    if (!this.state.disclaimer || this.state.province) return;

    try {
      const { router: { route } } = this.context;
      if (route.location.pathname === '/' && !this.state.province) {
        this.setState({ showRegion: true });
      }
    } catch (e) {
      debugLog('Error loading context router pathname', e);
      this.setState({ showRegion: true });
    }
  }

  handleMenuClick = e => this.setState({ menu: e.currentTarget })

  handleMenuClose = () => this.setState({ menu: null })

  render() {
    console.log('RENDER', this.state.user);

    const { children, classes } = this.props;

    const menuAuthenticatedActions = (
      <div>
        <MenuItem onClick={() => this.handleMenuClose()}>
          <Link to="/user">Dashboard</Link>
        </MenuItem>

        <MenuItem onClick={() => this.handleMenuClose()}>
          <Link to="/logout">Log out</Link>
        </MenuItem>
      </div>
    );

    const menuUnauthenticatedActions = (
      <div>
        <MenuItem onClick={() => this.handleMenuClose()}>
          <Link to="/login">Log in</Link>
        </MenuItem>

        <MenuItem onClick={() => this.handleMenuClose()}>
          <Link to="/signup">Sign up</Link>
        </MenuItem>
      </div>
    );

    const menuNavigation = (
      <div>
        {Auth.isUserAuthenticated() ? menuAuthenticatedActions : menuUnauthenticatedActions}

        <MenuItem
          color="secondary"
          onClick={() => {
            this.openRegionSelect();
            this.handleMenuClose();
          }}
        >
          Region {this.state.province ? `(${this.state.province})` : ''} <Icon>arrow_drop_down</Icon>
        </MenuItem>
      </div>
    );

    const authenticatedActions = (
      <span>
        <Button>
          <Link to="/user">Dashboard</Link>
        </Button>

        <Button>
          <Link to="/logout">Log out</Link>
        </Button>
      </span>
    );

    const unauthenticatedActions = (
      <span>
        <Button>
          <Link to="/login">Log in</Link>
        </Button>

        <Button>
          <Link to="/signup">Sign up</Link>
        </Button>
      </span>
    );

    const topNavigation = (
      <div>
        {Auth.isUserAuthenticated() ? authenticatedActions : unauthenticatedActions}

        <Button
          color="secondary"
          onClick={() => {
            this.openRegionSelect();
            this.handleMenuClose();
          }}
        >
          Region {this.state.province ? `(${this.state.province})` : ''} <Icon>arrow_drop_down</Icon>
        </Button>
      </div>
    );

    return (
      <Grid container style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AppBar
          position="static"
          color="default"
          className={classes.root}
        >
          <Toolbar>
            <Typography
              variant="title"
              color="primary"
              className={classes.flex}
            >
              <Link to="/" style={{ color: 'inherit' }}>Ad Boost App</Link>
            </Typography>

            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label="Menu"
                aria-owns={this.state.menu ? 'menu' : null}
                aria-haspopup
                onClick={e => this.handleMenuClick(e)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>

            <Menu
              id="menu"
              anchorEl={this.state.menu}
              open={Boolean(this.state.menu)}
              onClose={() => this.handleMenuClose()}
            >
              {menuNavigation}
            </Menu>

            <Hidden xsDown>
              {topNavigation}
            </Hidden>
          </Toolbar>
        </AppBar>
        {
          this.state.admin ? (
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="subheading"
                  color="inherit"
                >
                  You are logged in as an admin. You can use the <Link to="/admin">Admin Panel</Link>.
            </Typography>
              </Toolbar>
            </AppBar>
          ) : ''
        }

        <RegionSelectDialog
          open={this.state.showRegion}
          province={this.state.province}
          onClick={this.onRegionChangeClick}
          onCancel={this.closeRegionSelect}
        />

        <DisclaimerDialog
          open={!this.state.disclaimer}
          disclaimer={this.state.disclaimer}
          onClick={this.onDisclaimerAgreeClick}
          onCancel={this.onDisclaimerDisagreeClick}
        />

        {children}
      </Grid>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

App.childContextTypes = {
  province: PropTypes.string
};

export default withStyles(styles)(App);
