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

import Auth from '../modules/Auth';
import debugLog from '../utils/debug';

import RegionSelect from '../components/RegionSelect';

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

    this.state = {
      showRegion: !province ? true : false,
      province,
      menu: null
    };
  }

  componentDidMount() {
    this.checkRegionRequired();
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

  onRegionChangeClick = (province) => {
    this.setState({ province, showRegion: false });
  }

  closeRegionSelect = () => {
    this.setState({ showRegion: false });
  }

  openRegionSelect = () => {
    this.setState({ showRegion: true });
  }

  checkRegionRequired = () => {
    if (this.state.province) return;

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

  handleMenuClick = e => {
    this.setState({ menu: e.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ menu: null });
  }

  render() {
    const { children, classes } = this.props;

    const menuAuthenticatedActions = (
      <div>
        <MenuItem onClick={() => this.handleMenuClose()}>
          <Link to="/dashboard">Dashboard</Link>
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
          <Link to="/dashboard">Dashboard</Link>
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
      <Grid container>
        <AppBar
          position="static"
          color="default"
          className={classes.root}
        >
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/">Ad Boost App</Link>
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

        <RegionSelect
          open={this.state.showRegion}
          province={this.state.province}
          onChange={this.onRegionChangeClick}
          onCancel={this.closeRegionSelect}
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

export default withStyles(styles)(App);