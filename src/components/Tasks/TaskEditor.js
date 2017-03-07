import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import marked                    from 'marked';
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
    task: PropTypes.object.isRequired,
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
      }
    };
  }

  componentWillMount() {
    const { store } = this.context;
    const { id } = this.props.params;

    if (id) {
      return store.dispatch(fetchTask(id));
    }
  }

  componentWillReceiveProps(newProps) {
    const { task } = newProps;

    this.setState({
      task: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.due_date,
        completed: task.completed
      }
    });
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['task']: {
      ...this.state.task,
      [field]: e.target.value
    } });
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
              <input
                className="form-control"
                id="inputDueDate"
                onChange={this.handleChange('due_date')}
                placeholder="Due date"
                type="text"
                value={due_date}
                required
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
