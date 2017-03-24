import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';

import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import config from './config.js';
import './App.css';

class App extends Component {
  state = {
    userToken: null
  }

  _updateUserToken = userToken =>
    this.setState({ userToken });

  _handleNavLink = e => {
    e.preventDefault();
    this.props.history.push(e.currentTarget.getAttribute('href'));
  }

  _handleLogout = () => {
    this.updateUserToken(null);
  }

  _getCurrentUser() {
    return new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    }).getCurrentUser();
  }

  _getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession((err, session) => {
        if (err) {
          return reject(err);
        }
        return resolve(session.geIdToken().getJwtToken());
      });
    });
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this._updateUserToken
    }
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.userToken
                ? <NavItem onClick={this._handleLogout}>Logout</NavItem>
                : [
                  <RouteNavItem key={1} onClick={this._handleNavLink} href="/signup">Signup</RouteNavItem>,
                  <RouteNavItem key={2} onClick={this._handleNavLink} href="/login">Login</RouteNavItem>
                ]
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
