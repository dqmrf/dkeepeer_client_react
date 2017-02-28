import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import { logout } from '../actions/auth';

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

  static fillStore(redux) {}

  static contextTypes = {
    router: PropTypes.object
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
