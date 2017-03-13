import React                     from 'react';
import DatePicker                from 'react-datepicker'
import Formsy, 
  { Decorator as FormsyElement } from 'formsy-react';
import DateInput                 from './DatePicker/DateInput';

@FormsyElement()
export default class FormDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this)
  }

  changeValue = e => {
    const { handleChange, setValue } = this.props;
    const date = e._d;

    handleChange(e);
    setValue(date);
  }

  getLabel() {
    const { title, name, isRequired } = this.props;

    return (title ?
      <label htmlFor={name}>
        { title } { isRequired() ? '*' : null }
      </label>
      : null
    );
  }

  render() {
    const className = 'form-group' + (this.props.className || '');

    return (
      <div className={className}>
        {this.getLabel()}
        <DatePicker
          className='form-control'
          customInput={this.props.customInput || <DateInput />}
          minDate={this.props.minDate}
          onChange={this.changeValue}
          placeholderText={this.props.placeholderText || null}
          selected={this.props.selected}
          fixedHeight
        />
      </div>
    );
  }
};
