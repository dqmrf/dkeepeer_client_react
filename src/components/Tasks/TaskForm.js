import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import Moment                    from 'moment';
import FormInput                 from '../Layout/Form/Input';
import FormTextarea              from '../Layout/Form/Textarea';
import FormDatePicker            from '../Layout/Form/DatePicker';
import extractPropertyFromObject from '../../utils/extractPropertyFromObject';

@connect(state => ({
  isFetched: state.tasks.fetched,
}), {})
export default class TaskForm extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.taskState = {
      title: {
        value: '',
        blured: false,
      },
      description: {
        value: '',
        blured: false,
      },
      priority: {
        value: '',
        blured: false,
      },
      due_date: {
        value: '',
        blured: false,
      },
      completed: {
        value: false,
        blured: false,
      },
    }

    this.state = {
      task: this.taskState,
      startDate: Moment()
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = model => {
    const { isFetched } = this.props;
    const { task } = this.state;
    const taskValues = extractPropertyFromObject(task, 'value');

    this.props.onSave(taskValues);

    if (isFetched) {
      this.setState({
        task: this.taskState,
        startDate: Moment()
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.refs.form.reset();
  }

  handleChange = (field, values) => {
    this.setState((prevState) => ({
      task: {
        ...prevState.task,
        [field]: {
          ...prevState.task[field],
          ...values
        }
      }
    }));
  }

  handleDateChange = e => {
    const date = e._d;

    this.setState((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        due_date: {
          ...prevState.task.due_date,
          value: date
        }
      },
      startDate: e
    }));
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return(
      <Formsy.Form 
        ref='form'
        onValidSubmit={this.handleSubmit} 
        onValid={this.enableButton} 
        onInvalid={this.disableButton}
      >

        <FormInput 
          title="Title"
          name="title"
          value={title.value}
          isBlured={title.blured}
          handleChange={this.handleChange}
          validationErrors={{
            isRequired: "Title is required"
          }}
          required
        />

        <FormTextarea
          title="Description"
          name="description"
          value={description.value}
          isBlured={description.blured}
          handleChange={this.handleChange}
          validationErrors={{
            isRequired: "Description is required"
          }}
          rows="4"
          required
        />

        <FormInput
          title="Priority"
          name="priority"
          type="number"
          value={priority.value}
          isBlured={priority.blured}
          handleChange={this.handleChange}
          validations="isNumeric"
          validationErrors={{
            isNumeric: "Priority must be an integer",
            isRequired: "Priority is required"
          }}
          required
        />

        <FormDatePicker
          title="Due date"
          name="due_date"
          minDate={Moment()}
          selected={this.state.startDate}
          handleChange={this.handleDateChange}
          required
        />

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={!this.state.canSubmit}
        >Create task</button>
      </Formsy.Form>
    );
  }
}
