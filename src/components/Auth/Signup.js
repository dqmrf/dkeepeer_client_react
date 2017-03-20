import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import { signup }                from '../../actions/auth';
import FormInput                 from '../Layout/Form/Input';
import extractPropertyFromObject from '../../utils/extractPropertyFromObject';

@connect(state => ({
  fetching: state.auth.fetching.signup,
  fetched: state.auth.fetched.signup
}), { signup })
export default class Signup extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    
    this.userState = {
      email: {
        value: '',
        blured: false
      },
      firstName: {
        value: '',
        blured: false
      },
      lastName: {
        value: '',
        blured: false
      },
      password: {
        value: '',
        blured: false
      },
      passwordConfirmation: {
        value: '',
        blured: false
      }
    }

    this.state = {
      user: this.userState,
      canSubmit: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (field, values) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: {
          ...prevState.user[field],
          ...values
        }
      }
    }));
  }

  handleSubmit = model => {
    const { user } = this.state;
    const router = this.context.router;
    const userValues = extractPropertyFromObject(user, 'value');

    this.props.signup(userValues, router);
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
    const { fetching, fetched } = this.props;
    const { 
      email, 
      firstName, 
      lastName, 
      password, 
      passwordConfirmation 
    } = this.state.user;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          <h3>Sign up</h3>

          <Formsy.Form 
            ref='form'
            onValidSubmit={this.handleSubmit} 
            onValid={this.enableButton} 
            onInvalid={this.disableButton}
          >

            <FormInput 
              title="Email"
              name="email"
              type="email"
              value={email.value}
              isBlured={email.blured}
              validations="isEmail"
              validationErrors={{
                isEmail: "Email is not valid",
                isRequired: "Email is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <FormInput 
              title="First Name"
              name="firstName"
              value={firstName.value}
              isBlured={firstName.blured}
              validationErrors={{
                isRequired: "First name is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <FormInput 
              title="Last Name"
              name="lastName"
              value={lastName.value}
              isBlured={lastName.blured}
              validationErrors={{
                isRequired: "Last name is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <FormInput 
              title="Password"
              name="password"
              type="password"
              value={password.value}
              isBlured={password.blured}
              validations="minLength:6"
              validationErrors={{
                minLength: "Minimum password length is 6",
                isRequired: "Password is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <FormInput
              title="Password Confirmation"
              name="passwordConfirmation"
              type="password"
              value={passwordConfirmation.value}
              isBlured={passwordConfirmation.blured}
              validations="equalsField:password"
              validationErrors={{
                equalsField: "Passwords don't match",
                isRequired: "Password confirmation is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!this.state.canSubmit || fetching}
            >
              { fetching ?
                <span className="spin-wrap">
                  <span>Sign me up</span>
                  <i class="fa fa-circle-o-notch fa-spin"></i>
                </span> 
                : 'Sign me up'
              }
            </button>

          </Formsy.Form>
          
        </div>
      </div>
    );
  }
}
