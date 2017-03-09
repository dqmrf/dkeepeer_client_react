import React, { PropTypes } from 'react';
import TasksList            from './TasksList';
import './TasksContainer.styl';

export default class TasksContainer extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    checkedTasks: PropTypes.array.isRequired,
    isActive: PropTypes.bool.isRequired,
    updateCheckedTasks: PropTypes.func.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    handleDestroy: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  toggleCompleted = (id, status, i) => {
    this.props.toggleCompleted(id, status, i);
  }

  handleDestroy = id => {
    this.props.handleDestroy(id);
  }

  handleDestroyMultiple = e => {
    const { checkedTasks } = this.props;

    this.handleDestroy(checkedTasks);
  }

  handleCheckboxChange = (id, checked, index) => {
    const { checkedTasks } = this.props;
    let tasks = checkedTasks; 

    if (checked) {
      if (!tasks.length) return;

      if (tasks[index] != id) {
        index = tasks.indexOf(id);
      }
      tasks.splice(index, 1);
    } else {
      tasks.push(id);
    }

    this.updateCheckedTasks(tasks, this.props.isActive);
  }

  updateCheckedTasks = (tasks, isActive) => {
    this.props.updateCheckedTasks(tasks, isActive);
  }

  handleCheckAll = check => e => {
    const { tasks } = this.props;
    let ids = [];
    
    if (check) {
      tasks.forEach((task, i) => ids.push(task.id));
    }
    
    this.updateCheckedTasks(ids, this.props.isActive);
  }



  render() {
    const { tasks, isActive } = this.props;
    const { checkedTasks } = this.props;

    if (!tasks || !tasks.length) return false;

    return(
      <div>
        <div className={`panel panel-${isActive ? 'primary' : 'success'} dashboard-panel`}>

          <div className="panel-heading">
            <h4 className="panel-title">
              {isActive ? 'Active tasks' : 'Completed tasks'}
            </h4>
            <div className="panel-actions-overlap">
              <div className="btn-group">
                <button 
                  className={`btn btn-${isActive ? 'success' : 'primary'} btn-sm`}
                  disabled={checkedTasks.length ? '' : 'disabled'}
                  onClick={this.handleDestroyMultiple}
                >Delete selected</button>
                <button 
                  className="btn btn-default btn-sm"
                  onClick={this.handleCheckAll.call(this, true)}
                ><i className="glyphicon glyphicon-check"></i></button>
                <button 
                  className="btn btn-default btn-sm"
                  onClick={this.handleCheckAll.call(this, false)}
                ><i className="glyphicon glyphicon-unchecked"></i></button>
              </div>
            </div>
          </div>

          <TasksList
            tasks={tasks}
            checkedTasks={checkedTasks}
            toggleCompleted={this.toggleCompleted}
            handleCheckboxChange={this.handleCheckboxChange}
            handleDestroy={this.handleDestroy}
          />
          
        </div>
      </div>
    );
  }
}
