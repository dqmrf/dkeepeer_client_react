import styl                 from './styles.styl';
import CSSModules           from 'react-css-modules';
import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

@CSSModules(styl)
export default class TasksList extends React.Component {
  static propTypes = {
    tasks: PropTypes.array,
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
    const { tasks } = this.props;

    let tasksList =  tasks.map((task, i) => {
      return (
        <li className={`list-group-item ${styl['list-group-item']}`} key={i}>

          <div className={`${styl.actions} ${styl.left_actions}`}>
            <Link to={`/admin/task/${task.id}`}>
              {task.title}
            </Link>
          </div>
          
          <div className={`btn-group ${styl.actions} ${styl.right_actions} ${styl.animated}`}>
            <Link 
              to={`/admin/task/${task.id}/edit`} 
              className="btn btn-primary btn-sm"
            >
              Edit
            </Link>
            <button 
              onClick={this.toggleCompleted.bind(this, task.id, task.completed)}
              className={`btn btn-${task.completed ? 'warning' : 'success'} btn-sm`}
            >
              {task.completed ? 'Mark active' : 'Mark done'}
            </button>
            <button 
              onClick={this.handleDestroy.bind(this, task.id)}
              className="btn btn-danger btn-sm"
            >
              Destroy
            </button>
          </div>

        </li>
      );
    });

    return(
      <ul className={`list-group ${styl['list-group']} ${styl['tasks-list']}`}>
        {tasksList}
      </ul>
    );
  }
}
