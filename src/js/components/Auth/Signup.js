import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { signup }           from '../../actions/auth';

@connect(state => ({
  auth: state.auth
}), {
  signup
})
export default class Signup extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['user']: {
      ...this.state.user,
      [field]: e.target.value
    } });
  }

  handleSubmit = e => {
    e.preventDefault();
    const router = this.context.router;
    const { user } = this.state;
    this.props.signup(user, router);
  }

  render() {
    const { auth: { error } } = this.props;
    const { user } = this.state;
    const { 
      email, 
      firstName, 
      lastName, 
      password, 
      passwordConfirmation 
    } = user;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          <h2>Sign up</h2>

          {error
            ? <div>{error.message}</div>
            : null}

          <form onSubmit={this.handleSubmit}>
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
              <label htmlFor="inputFirstName" className="control-label">
                First name
              </label>
              <input
                className="form-control"
                id="inputFirstName"
                onChange={this.handleChange('firstName')}
                placeholder="First name"
                type="text"
                value={firstName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputLastName" className="control-label">
                Last name
              </label>
              <input
                className="form-control"
                id="inputLastName"
                onChange={this.handleChange('lastName')}
                placeholder="Last name"
                type="text"
                value={lastName}
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

            <div className="form-group">
              <label htmlFor="inputPasswordConfirmation" className="control-label">
                Password confirmation
              </label>
              <input
                className="form-control"
                id="inputPasswordConfirmation"
                onChange={this.handleChange('passwordConfirmation')}
                placeholder="Password confirmation"
                type="password"
                value={passwordConfirmation}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Sign me up
            </button>
          </form>
          
        </div>
      </div>
    );
  }
}
