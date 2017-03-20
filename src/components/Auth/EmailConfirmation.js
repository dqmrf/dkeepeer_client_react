import React, { PropTypes }       from 'react';
import { connect }                from 'react-redux';
import { Link }                   from 'react-router';
import { checkConfirmationToken } from '../../actions/auth';
import './EmailConfirmation.styl';

@connect(state => ({
  fetching: state.auth.fetching.confirmation,
  fetched: state.auth.fetched.confirmation
}), { checkConfirmationToken })
export default class EmailConfirmation extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    checkConfirmationToken: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  componentWillMount() {
    const { query } = this.props.location;
    const token = query.confirmation_token;
    const { router, store } = this.context;

    if (!token) {
      router.push('/login');
      return;
    };

    return store.dispatch(checkConfirmationToken(token, router));
  }

  render() {
    const { fetching } = this.props;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="confirmation-page">
          { fetching ? 
            <h1>Loading...</h1> 
            :
            <div>
              <h1>Your email address has successfully confirmed.</h1>
              <div className="button-wrapper">
                <Link to="/login" title="Login" className="btn btn-success btn-lg btn-block">
                  Login
                </Link>
              </div>
            </div>            
          }
          </div>
        </div>
      </div>
    );
  }
}
