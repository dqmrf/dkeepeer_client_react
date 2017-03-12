import React, { PropTypes } from 'react';
import DatePicker           from 'react-datepicker'
import Moment               from 'moment';
import DateInput            from './DateInput';

export default class TaskForm extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    
    this.state = {
      task: {
        title: '',
        description: '',
        priority: '',
        due_date: '',
        completed: false
      },
      startDate: Moment()
    };
  }

  handleSave = e => {
    e.preventDefault();
    const { task } = this.state;
    this.props.onSave(task);
  }

  handleChange = field => e => {
    e.preventDefault();

    const { value } = e.target;

    this.setState((prevState) => ({
      task: {
        ...prevState.task,
        [field]: value
      }
    }));
  }

  handleDateChange = e => {
    const date = e._d;

    this.setState((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        due_date: date
      },
      startDate: e
    }));
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return(
      <form onSubmit={this.handleSave}>
        <div className="form-group">
          <label htmlFor="inputTitle" className="control-label">
            Title
          </label>
          <input
            className="form-control"
            id="inputTitle"
            onChange={this.handleChange('title')}
            placeholder="Title"
            type="text"
            value={title}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescription" className="control-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="inputDescription"
            onChange={this.handleChange('description')}
            placeholder="Description goes here"
            rows="6"
            value={description}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPriority" className="control-label">
            Priority
          </label>
          <input
            className="form-control"
            id="inputPriority"
            onChange={this.handleChange('priority')}
            placeholder="Priority"
            type="number"
            value={priority}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputDueDate" className="control-label">
            Due date
          </label>
          <DatePicker
            customInput={<DateInput />}
            id="inputDueDate"
            className="form-control"
            minDate={Moment()}
            selected={this.state.startDate}
            placeholderText="Click to select a date"
            onChange={this.handleDateChange}
            fixedHeight
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create Task
        </button>
      </form>
    );
  }
}
