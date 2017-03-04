import React, { PropTypes } from 'react';
import TasksList            from './TasksList';

export default class TasksContainer extends React.Component {
  static propTypes = {
    tasks: PropTypes.array,
    isActive: PropTypes.bool,
    toggleCompleted: PropTypes.func.isRequired,
    handleDestroy: PropTypes.func.isRequired
  }

  toggleCompleted = (id, status) => {
    this.props.toggleCompleted(id, status);
  }

  handleDestroy = (id) => {
    this.props.handleDestroy(id);
  }

  render() {
    const { tasks, isActive } = this.props;

    if (!tasks || !tasks.length) return false;

    return(
      <div className={`panel panel-${isActive ? 'primary' : 'success'}`}>

        <div className="panel-heading">
          <h4 className="panel-title">
            {isActive ? 'Active tasks' : 'Completed tasks'}
          </h4>
        </div>

        <TasksList
          tasks={tasks}
          toggleCompleted={this.toggleCompleted.bind(this)}
          handleDestroy={this.handleDestroy.bind(this)}
        />
        
      </div>
    );
  }
}
