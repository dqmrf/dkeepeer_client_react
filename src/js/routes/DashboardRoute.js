import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import Dashboard            from '../components/Admin/Dashboard/Dashboard';
import { fetchTasks }       from '../actions/tasks';

@connect(state => ({
  tasks: state.tasks.tasks
}), {
  fetchTasks
})

export default class DashboardRoute extends React.Component {
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

  render() {
    const { tasks } = this.props;

    return (
      <Dashboard
        tasks={tasks}
        toggleCompleted={this.toggleCompleted}
      />
    );
  }
}
