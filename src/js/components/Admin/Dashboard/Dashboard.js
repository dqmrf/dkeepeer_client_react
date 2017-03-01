import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
  }

  toggleCompleted = (id, status) => {
    this.props.toggleCompleted(id, status);
  }

  buildTasks(tasks) {
    return tasks.map((task, i) => {
      return (
        <li key={i}>{task.title}</li>
      );
    });
  }

  render() {
    const { tasks } = this.props;
    const activeTasks = this.buildTasks(tasks.filter(task => !task.completed))
    const completedTasks = this.buildTasks(tasks.filter(task => task.completed))

    return(
      <div>
        <h2>Tasks List</h2>

        <div>
          <h4>Active tasks</h4>
          <ul>{activeTasks}</ul>
        </div>

        <div>
          <h4>Completed tasks</h4>
          <ul>{completedTasks}</ul>
        </div>
      </div>
    );
  }
}
