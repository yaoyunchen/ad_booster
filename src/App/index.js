import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Auth from '../modules/Auth';

import RegionSelect from '../components/RegionSelect';

import debugLog from '../utils/debug';

import './App.scss';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    const province = localStorage.getItem('province');

    this.state = {
      showRegion: !province ? true : false,
      province
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

  render() {
    const { children } = this.props;

    return (
      <div>
        <RegionSelect
          open={this.state.showRegion}
          province={this.state.province}
          onChange={this.onRegionChangeClick}
          onCancel={this.closeRegionSelect}
        />

        <div className="top-bar">
          <div className="top-bar-left">
            <Link to="/">React App</Link>
          </div>

          <div className="top-bar-right">
            <button onClick={() => this.openRegionSelect()}>
              ChangeRegion {this.state.province ? `current: (${this.state.province})` : ''}
            </button>

            <button onClick={() => {
              localStorage.removeItem('province');
              debugLog('Done, refresh the page');
            }}>
              TEST: Clear province
            </button>

            {
              Auth.isUserAuthenticated() ? (
                <div>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/logout">Log out</Link>
                </div>
              ) : (
                  <div>
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                  </div>
                )
            }
          </div>
        </div>

        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default App;
