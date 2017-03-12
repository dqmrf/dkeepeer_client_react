import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { login }            from '../../actions/auth';
import FormInput            from '../Layout/Form/Input';

@connect(state => ({
  auth: state.auth
}), {
  login
})
export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        email: '',
        password: ''
      },
      canSubmit: false
    };
  }

  handleSubmit = model => {
    const { user } = this.state;
    const router = this.context.router;

    this.props.login(user, router);
  }

  handleChange = field => e => {
    e.preventDefault();

    const value = e.target.value;

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }));
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  render() {
    const { auth: { error } } = this.props;
    const { user } = this.state;
    const { email, password } = user;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          <h3>Login</h3>

          {error
            ? <div>{error.message}</div>
            : null}

          <Formsy.Form 
            onValidSubmit={this.handleSubmit} 
            onValid={this.enableButton} 
            onInvalid={this.disableButton}
          >

            <FormInput 
              title="Email"
              name="email"
              type="email"
              validations="isEmail"
              validationErrors={{
                isEmail: "Email is not valid",
                isRequired: "Email is required"
              }}
              handleChange={this.handleChange('email')}
              required
            />

            <FormInput 
              title="Password"
              name="password"
              type="password"
              validations="minLength:6"
              validationErrors={{
                minLength: "Minimum password length is 6",
                isRequired: "Password is required"
              }}
              handleChange={this.handleChange('password')}
              required
            />

            <button 
              type="submit" 
              className="btn btn-success"
              disabled={!this.state.canSubmit}
            >Sign in</button>

          </Formsy.Form>

        </div>
      </div>
    );
  }
}
