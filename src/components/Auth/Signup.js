import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { signup }           from '../../actions/auth';
import FormInput            from '../Layout/Form/Input';

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
      },
      canSubmit: false
    };
  }

  handleChange = field => e => {
    e.preventDefault();
    
    const value = e.target;

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }));
  }

  handleSubmit = e => {
    const router = this.context.router;
    const { user } = this.state;

    this.props.signup(user, router);
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

          <h3>Sign up</h3>

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
              title="First Name"
              name="firstName"
              validationErrors={{
                isRequired: "First name is required"
              }}
              handleChange={this.handleChange('firstName')}
              required
            />

            <FormInput 
              title="Last Name"
              name="lastName"
              validationErrors={{
                isRequired: "Last name is required"
              }}
              handleChange={this.handleChange('lastName')}
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

            <FormInput
              title="Password Confirmation"
              name="passwordConfirmation"
              type="password"
              validations="equalsField:password"
              validationErrors={{
                equalsField: "Passwords don't match",
                isRequired: "Password confirmation is required"
              }}
              handleChange={this.handleChange('passwordConfirmation')}
              required
            />

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!this.state.canSubmit}
            >Sign me up</button>

          </Formsy.Form>
          
        </div>
      </div>
    );
  }
}
