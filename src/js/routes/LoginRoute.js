import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { signup }           from '../actions/auth';
import Signup               from '../components/Auth/Signup';

@connect(state => ({
  auth: state.auth
}), {
  signup
})

export default class LoginRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleLogin = (email, password) => {
    const router = this.context.router;
    this.props.login(email, password, router);
  }

  render() {
    return (
      <Login
        auth={this.props}
        handleLogin={this.handleLogin}
       />
    );
  }
}
