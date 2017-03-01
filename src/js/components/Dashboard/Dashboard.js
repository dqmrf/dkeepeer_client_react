import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import { fetchTasks }       from '../../actions/tasks';

@connect(state => ({
  tasks: state.tasks.tasks
}), {
  fetchTasks
})

export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired
  }

  static fillStore(redux) {
    return redux.dispatch(fetchTasks());
  }

  toggleCompleted = (id, status) => {
    const post = this.props.tasks.find(post => task.id === id);

    this.props.saveTask({
      ...task,
      completed: !status
    });
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
