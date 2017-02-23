import React                 from 'react';
import { Router }            from 'react-router';
import { Provider }          from 'react-redux';
import cookie                from './utils/cookie';
import routes                from './routes';
import { routerStateChange } from './actions/router';
import { createRedux }       from './utils/redux';

// Maybe this constant has to be changed, i don't really know yet...
const store = createRedux({ 
  auth: { 
    token: cookie.get('token') || ''
  } 
});

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <Provider store={store}>
        <Router
          history={this.props.history}
          routes={routes(store, true)}
          onUpdate={function() {
            store.dispatch(routerStateChange(this.state));
          }}
        />
      </Provider>
    );
  }
}
