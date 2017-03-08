import React, { PropTypes } from 'react';
import TasksList            from './TasksList';
import './TasksContainer.styl';

export default class TasksContainer extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    isActive: PropTypes.bool.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    handleDestroy: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      checkedTasks: []
    };

    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  toggleCompleted = (id, status) => {
    this.props.toggleCompleted(id, status);
  }

  handleDestroy = id => {
    this.props.handleDestroy(id);
  }

  handleDestroyMultiple = e => {
    const { checkedTasks } = this.state;

    this.handleDestroy(checkedTasks);
  }

  handleCheckboxChange = (id, checked, index) => {
    const { checkedTasks } = this.state;
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

    this.setState({ checkedTasks: tasks });
  }

  handleCheckAll = check => e => {
    const { tasks } = this.props;
    let ids = [];
    
    if (check) {
      tasks.forEach((task, i) => ids.push(task.id));
    }
    
    this.setState({checkedTasks: ids});
  }

  render() {
    const { tasks, isActive } = this.props;
    const { checkedTasks } = this.state;

    if (!tasks || !tasks.length) return false;

    return(
      <div>
        <div className={`panel panel-${isActive ? 'primary' : 'success'} dashboard-panel`}>

          <div className="panel-heading">
            <h4 className="panel-title">
              {isActive ? 'Active tasks' : 'Completed tasks'}
            </h4>
            <div className="btn-group">
              <button 
                className={`btn btn-${isActive ? 'success' : 'primary'} btn-sm`}
                disabled={checkedTasks.length ? '' : 'disabled'}
                onClick={this.handleDestroyMultiple}
              >Delete selected</button>
              <button 
                className="btn btn-default btn-sm"
                onClick={this.handleCheckAll.call(this, true)}
              >Check all</button>
              <button 
                className="btn btn-default btn-sm"
                onClick={this.handleCheckAll.call(this, false)}
              >Uncheck all</button>
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
