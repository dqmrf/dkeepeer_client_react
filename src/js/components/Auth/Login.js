import React, { PropTypes } from 'react';

export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['user']: {
      ...this.state.user,
      [field]: e.target.value
    } });
  }

  handleLogin = e => {
    e.preventDefault();
    const { user } = this.state;
    this.props.handleLogin(user);
  }

  render() {
    const { auth: { error } } = this.props;
    const { user } = this.state;
    const { email, password } = user;

    return(
      <div>
        <h2>Login</h2>

        {error
          ? <div>{error.message}</div>
          : null}

        <form onSubmit={this.handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={this.handleChange('email')}
            id="email"
            type="email"
            placeholder="Email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={this.handleChange('password')}
            id="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
