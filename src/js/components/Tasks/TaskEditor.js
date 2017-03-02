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
  }

  state = {
    task: {
      title: '',
      description: '',
      priority: '',
      due_date: '',
      completed: false
    }
  }

  static fillStore(redux, props) {
    if (props.params.id) {
      return redux.dispatch(fetchTask(props.params.id));
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

  handleSave = (e) => {
    e.preventDefault();
    const { id } = this.props.params;
    const { task } = this.state;
    this.props.updateTask(id, task);
  }

  render() {
    // const { params: { id } } = this.props;
    const { title, description, priority, due_date } = this.state.task;

    return (
      <div>
        <input
          value={title}
          onChange={this.handleChange('title')}
          type="text"
          placeholder="Title"
        />

        <textarea
          onChange={this.handleChange('description')}
          value={description}
          placeholder="Description goes here"
          rows="7"
        />

        <input
          value={priority}
          onChange={this.handleChange('priority')}
          type="number"
          placeholder="Priority"
        />

        <input
          value={due_date}
          onChange={this.handleChange('due_date')}
          type="text"
          placeholder="Due date"
        />

        <button
          onClick={this.handleSave}
        >Update</button>
      </div>
    );
  }
}
