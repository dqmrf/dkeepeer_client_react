import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import DatePicker                from 'react-datepicker'
import Moment                    from 'moment';
import { fetchTask, updateTask } from '../../actions/tasks';

@connect(state => ({
  task: state.tasks.task
}), {
  fetchTask,
  updateTask
})
export default class TaskEditor extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object
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

  componentDidMount() {
    const { store } = this.context;
    const { id } = this.props.params;

    if (id) {
      return store.dispatch(fetchTask(id));
    }
  }

  componentWillReceiveProps(newProps) {
    const { task } = newProps;

    this.setState((prevState) => ({
      ...prevState,
      task: { ...task },
      startDate: Moment(task.due_date)
    }));
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
      task: {
        ...prevState.task,
        due_date: date
      },
      startDate: e
    }));
  }

  handleSave = e => {
    e.preventDefault();
    const { id } = this.props.params;
    const { task } = this.state;
    this.props.updateTask(id, task);
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
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
              Update task
            </button>
          </form>
        </div>
      </div>
    );
  }
}
