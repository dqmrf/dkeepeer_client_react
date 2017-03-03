import React, { PropTypes }       from 'react';
import { Link }                   from 'react-router';
import { connect }                from 'react-redux';
import TaskForm                   from './TaskForm';
import { fetchTasks, createTask } from '../../actions/tasks';

@connect(state => ({
  tasks: state.tasks.tasks
}), {
  fetchTasks,
  createTask
})

export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired
  }

  state = {
    task: {
      title: '',
      description: '',
      priority: '',
      due_date: '',
      completed: false
    }
  }

  static fillStore(redux) {
    return redux.dispatch(fetchTasks());
  }

  toggleCompleted = (id, status) => {
    const task = this.props.tasks.find(task => task.id === id);

    this.props.saveTask({
      ...task,
      completed: !status
    });
  }

  handleSave = (task) => {
    this.props.createTask(task);
  }

  buildTasks(tasks) {
    return tasks.map((task, i) => {
      return (
        <li key={i}>
          <Link to={`/admin/task/${task.id}`}>
            {task.title}
          </Link>
          &nbsp;|&nbsp;
          <Link to={`/admin/task/${task.id}/edit`}>
            edit
          </Link>
        </li>
      );
    });
  }

  render() {
    const { tasks } = this.props;
    const { task } = this.state;
    const activeTasks = this.buildTasks(tasks.filter(t => !t.completed))
    const completedTasks = this.buildTasks(tasks.filter(t => t.completed))

    return(
      <div>

        <div>
          <h2>Tasks List</h2>

          <div>
            <h4>Active tasks</h4>
            <ul>{activeTasks}</ul>
          </div>

          <div>
            <h4>Completed tasks</h4>
            <ul>{completedTasks}</ul>
          </div>
        </div>

        <TaskForm
          task={task}
          onSave={this.handleSave}
        />

      </div>
    );
  }
}
