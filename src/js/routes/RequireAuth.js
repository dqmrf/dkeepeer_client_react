import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent, req=true) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      console.log(this.props);
      if (req && !this.props.authenticated) {
        this.context.router.push('/login');
      } else if (!req && this.props.authenticated) {
        this.context.router.push('/admin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.token };
  }

  return connect(mapStateToProps)(Authentication);
}
