import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import Header                   from '../components/Layout/Header/Header';
import { logout }               from '../actions/auth';

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
        <Header
          loggedIn={!!auth.token}
          router={this.context.router}
          {...bindActionCreators({ logout }, dispatch)}
        />
        
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
