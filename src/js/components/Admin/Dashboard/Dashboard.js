import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    activeTasks: PropTypes.array.isRequired,
    completedTasks: PropTypes.array.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
  }

  toggleCompleted = (id, status) => {
    this.props.toggleCompleted(id, status);
  }

  render() {
    const { activeTasks, completedTasks } = this.props;

    return(
      <div>
        <h2>Your Tasks</h2>
      </div>
    );
  }
}
