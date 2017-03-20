import React, { PropTypes } from 'react';

export default class DateInput extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    value: React.PropTypes.string
  };

  render () {
    return (
      <input 
        type="text" 
        className="form-control" 
        onClick={this.props.onClick} 
        value={this.props.value} 
      />
    )
  }
}
