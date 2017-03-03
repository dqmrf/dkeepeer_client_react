import React, { PropTypes } from 'react';

export default class TaskForm extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onSave: PropTypes.func.isRequired
  }

  state = {
    task: { ...this.props.task }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      task: {
        ...newProps.task
      }
    });
  }

  handleSave = (e) => {
    e.preventDefault();
    const { task } = this.state;
    this.props.onSave(task);
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['task']: {
      ...this.state.task,
      [field]: e.target.value
    } });
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return(
      <form onSubmit={this.handleSave}>
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={this.handleChange('title')}
          id={title}
          type="text"
          placeholder="Title"
        />

        <label htmlFor="description">Description</label>
        <textarea
          onChange={this.handleChange('description')}
          id={description}
          value={description}
          placeholder="Description goes here"
          rows="7"
        />

        <label htmlFor="priority">Priority</label>
        <input
          onChange={this.handleChange('priority')}
          id={priority}
          value={priority}
          type="number"
          placeholder="Priority"
        />

        <label htmlFor="due_date">Due date</label>
        <input
          onChange={this.handleChange('due_date')}
          id={due_date}
          value={due_date}
          type="text"
          placeholder="Due date"
        />

        <button type="submit">
          Create Task
        </button>
      </form>
    );
  }
}
