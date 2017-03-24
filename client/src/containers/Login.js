import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

import config from '../config';
import './Login.css';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  _validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  }

  _handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  _handleSubmit = async e => {
    e.preventDefault();

    try {
      const userToken = await this._login(this.state.username, this.state.password);
      this.props.updateUserToken(userToken);
    } catch (e) {
      alert(e);
    }
  }

  _login(Username, Password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const authenticationData = {
      Username,
      Password
    }

    const user = new CognitoUser({ Username, Pool: userPool });

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: res => resolve(res.getIdToken().getJwtToken()),
        onFailure: err => reject(err)
      })
    ));
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this._handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this._handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this._handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this._validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
