import React  from 'react';
import Formsy from 'formsy-react';

const FormInput = React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      value: '',
      isBlured: false
    };
  },

  getRequiredMessage() {
    const { value, isBlured } = this.state;

    if (isBlured && (!value && this.showRequired() && !this.showError() && !this.isPristine())) {
      return this.props.validationErrors.isRequired;
    }
    return '';
  },

  getAllMessages() {
    const { isBlured } = this.state;
    const errorMessage = isBlured ? wrapMessage(this.getErrorMessage()) : '';
    const requiredMessage = wrapMessage(this.getRequiredMessage());

    function wrapMessage(message) {
      return (message ?
        <span className='help-block'>{message}</span> : ''
      );
    }

    return(
      <div className="error-messages-overlap">
        {errorMessage}
        {requiredMessage}
      </div>
    );
  },

  getClassName() {
    const { isBlured } = this.state;
    let className = 'form-group' + (this.props.className || ' ');

    if (isBlured && (this.showRequired() && !this.isPristine() || this.showError())) {
      className += 'has-error';
    }

    return className;
  },

  getLabel() {
    const { title, name } = this.props || null;

    return (title ?
      <label className="control-label" htmlFor={name}>
        { title } { this.isRequired() ? '*' : null }
      </label>
      : null
    );
  },

  isCheckbox() {
    return this.props.type === 'checkbox' ? true : false;
  },

  changeValue(e) {
    let newValue = e.currentTarget[
      this.isCheckbox() ? 'checked' : 'value'
    ];

    this.props.handleChange(e);
    this.setState({value: newValue});
    this.setValue(newValue);
  },

  handleBlur(e) {
    if (!this.isPristine()) {
      this.setState({isBlured: true});
    }
  },

  render() {
    const className = this.getClassName();
    const errorMessages = this.getAllMessages();

    return (
      <div className={className}>
        {this.getLabel()}
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          onBlur={this.handleBlur}
          value={this.state.value}
          checked={this.isCheckbox() && this.getValue() ? 'checked' : null}
          className="form-control"
          placeholder={this.props.placeholder || null}
        />
        {errorMessages}
      </div>
    );
  }
});

export default FormInput;
