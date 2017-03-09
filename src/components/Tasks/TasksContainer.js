import React, { PropTypes } from 'react';
import TasksList            from './TasksList';
import './TasksContainer.styl';

export default class TasksContainer extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    functions: PropTypes.object.isRequired,
    checkedTasks: PropTypes.array.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  toggleCompleted = (id, status, i) => {
    const { toggleCompleted } = this.props.functions;

    toggleCompleted(id, status, i);
  }

  handleDestroy = id => {
    const { handleDestroy } = this.props.functions;

    handleDestroy(id);
  }

  handleDestroyMultiple = e => {
    const { checkedTasks } = this.props;
    const { handleDestroy } = this.props.functions;

    handleDestroy(checkedTasks);
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

    this.updateTasksState(tasks, this.props.isActive, true);
  }

  updateTasksState = (tasks, isActive, isChecked=false) => {
    const { updateTasksState } = this.props.functions;

    updateTasksState(tasks, isActive, isChecked);
  }

  handleCheckAll = check => e => {
    const { tasks } = this.props;
    let ids = [];
    
    if (check) {
      tasks.forEach((task, i) => ids.push(task.id));
    }
    
    this.updateTasksState(ids, this.props.isActive, true);
  }

  sortBy = (field, desc) => e => {
    const { tasks, isActive, functions } = this.props;
    let sortedTasks = tasks.sort((a, b) => {
      let A = getFormatted(a);
      let B = getFormatted(b);
      return !desc ? _sort(A, B) : _sort(B, A);
    });

    functions.updateTasksState(sortedTasks, isActive);

    function getFormatted(s) {
      return typeof s == 'string' ? s[field].toUpperCase() : s[field];
    }

    function _sort(A, B) {
      return (A < B) ? -1 : (A > B) ? 1 : 0;
    }
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
                  className="btn btn-default btn-sm"
                  onClick={this.sortBy.call(this, 'title', false)}
                >Sort by title</button>
                <button 
                  className="btn btn-default btn-sm"
                  onClick={this.sortBy.call(this, 'id', false)}
                >Sort by id</button>
              </div>
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
