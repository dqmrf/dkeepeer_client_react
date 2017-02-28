import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import Dashboard            from '../components/Admin/Dashboard/Dashboard';
import {
  fetchTasks,
  saveTask
} from '../actions/tasks';

@connect(state => ({
  tasks: state.tasks.tasks
}), {
  fetchTasks,
  saveTask
})

export default class DashboardRoute extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    saveTask: PropTypes.func.isRequired
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

  render() {
    const tasks = this.props.tasks;
    const activeTasks = this.props.tasks.filter(item => !item.completed);
    const completedTasks = this.props.tasks.filter(item => item.completed);

    return (
      <Dashboard
        tasks={tasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        toggleCompleted={this.toggleCompleted}
      />
    );
  }
}
