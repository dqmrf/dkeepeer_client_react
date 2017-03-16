import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { fetchTask }        from '../../actions/tasks';
import './SingleTask.styl';

@connect(state => ({
  task: state.tasks.task
}), { fetchTask })
export default class SingleTask extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  componentDidMount() {
    const { store } = this.context;
    const { id } = this.props.params;

    if (id) {
      return store.dispatch(fetchTask(id));
    }
  }

  render() {
    const { task } = this.props;

    if (!task) return null;

    const { title, description, priority, due_date, completed, user_full_name } = task;

    return (
      <div className="single-task single-task-view">

        <div className="task-heading">
          <h2>{title}</h2>
          <span className={`label label-${completed ? 'success' : 'primary'}`}>
            { completed ? 'Completed' : 'Active' }
          </span>
        </div>

        <div className="task-details">

          <div className="task-description">
            <label>Description:&nbsp;</label>
            <p>{description}</p>
          </div>
          <div className="task-priority">
            <label>Priority:&nbsp;</label>
            <span>{priority}</span>
          </div>
          <div className="task-duedate">
            <label>Due date:&nbsp;</label>
            <span>{due_date}</span>
          </div>
          <div className="task-author">
            <label>Written by:&nbsp;</label>
            <span>{user_full_name}</span>
          </div>
        </div>

        <div>
          <Link to={`/admin/task/${task.id}/edit`}>
            Edit task
          </Link>
        </div>
      </div>
    );
  }
}
