import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import { fetchProfile, logout } from '../actions/auth';

@connect(state => ({
  auth: state.auth,
  router: state.router
}))

export default class App extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static fillStore(redux) {
    return redux.dispatch(fetchProfile());
  }

  render() {
    const { auth, dispatch } = this.props;

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
