import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { login }            from '../../actions/auth';

@connect(state => ({
  auth: state.auth
}), {
  login
})
export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
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

  handleLogin = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const router = this.context.router;
    this.props.login(user, router);
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['user']: {
      ...this.state.user,
      [field]: e.target.value
    } });
  }

  render() {
    const { auth: { error } } = this.props;
    const { user } = this.state;
    const { email, password } = user;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          <h2>Login</h2>

          {error
            ? <div>{error.message}</div>
            : null}

          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="inputEmail" className="control-label">
                Email
              </label>
              <input
                className="form-control"
                id="inputEmail"
                onChange={this.handleChange('email')}
                placeholder="Email"
                type="email"
                value={email}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="inputPassword" className="control-label">
                Password
              </label>
              <input
                className="form-control"
                id="inputPassword"
                onChange={this.handleChange('password')}
                placeholder="Password"
                type="password"
                value={password}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
