import React, { PropTypes }       from 'react';
import { connect }                from 'react-redux';
import { checkConfirmationToken } from '../../actions/auth';

@connect(state => ({
  auth: state.auth,
  requestProcessed: state.auth.fetched,
}), {
  checkConfirmationToken,
})
export default class EmailConfirmation extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
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
    let { requestProcessed } = this.props;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          { requestProcessed ? 
            <h1>Your email address has successfully confirmed.</h1> :
            <h1>Loading...</h1>
          }
        </div>
      </div>
    );
  }
}
