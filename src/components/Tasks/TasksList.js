import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import './TaskList.styl';

export default class TasksList extends React.Component {
  static propTypes = {
    tasks: PropTypes.array,
    checkedTasks: PropTypes.array,
    toggleCompleted: PropTypes.func.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleDestroy: PropTypes.func.isRequired
  };

  toggleCompleted = (id, status) => {
    this.props.toggleCompleted(id, status);
  }

  handleDestroy = id => {
    this.props.handleDestroy(id);
  }

  handleCheckboxChange = (id, checked, index) => e => {
    this.props.handleCheckboxChange(id, checked, index);
  }

  render() {
    const { tasks } = this.props;
    const { checkedTasks } = this.props;

    let tasksList = tasks.map((task, i) => {
      const { id, title, completed } = task;
      let checked = checkedTasks.includes(id);

      return (
        <li className="list-group-item" key={i}>

          <div className="actions left-actions">
            <input 
              type="checkbox"
              name="taskMarker"
              value={id}
              checked={checked}
              onChange={this.handleCheckboxChange(id, checked, i)}
            />
            <Link to={`/admin/task/${id}`}>
              {title}
            </Link>
          </div>
          
          <div className="btn-group actions right-actions animated">
            <Link 
              to={`/admin/task/${id}/edit`} 
              className="btn btn-primary btn-sm"
            >
              Edit
            </Link>
            <button 
              onClick={this.toggleCompleted.bind(this, id, completed)}
              className={`btn btn-${completed ? 'warning' : 'success'} btn-sm`}
            >
              {completed ? 'Mark active' : 'Mark done'}
            </button>
            <button 
              onClick={this.handleDestroy.bind(this, id)}
              className="btn btn-danger btn-sm"
            >
              Destroy
            </button>
          </div>

        </li>
      );
    });

    return(
      <ul className="list-group tasks-list">
        {tasksList}
      </ul>
    );
  }
}
