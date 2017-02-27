import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';

export default class GuestRoute extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
