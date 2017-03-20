import React             from 'react';
import { connect }       from 'react-redux';
import redirectBackAfter from '../utils/redirectBackAfter';

export default function (ComposedComponent, req=true) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      const { router } = this.context;
      const { authenticated } = this.props;
      let push = (path) => 
        router.push(...redirectBackAfter(path, router.location));

      if (req && !authenticated) {
        push('/login');
      } else if (!req && authenticated) {
        push('/admin');
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
