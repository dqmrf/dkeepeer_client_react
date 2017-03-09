import React, { PropTypes } from 'react';

export default class DateInput extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    value: React.PropTypes.string
  };

  render () {
    return (
      <button
        type="button"
        className="btn btn-default btn-block"
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    )
  }
}
