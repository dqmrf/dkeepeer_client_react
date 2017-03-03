import '../../styles/global.styl';
import styles               from './styles.styl';
import CSSModules           from 'react-css-modules';
import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import TaskForm             from './TaskForm';
import { 
  fetchTasks, 
  createTask, 
  updateTask,
  destroyTask }             from '../../actions/tasks';

@connect(state => ({
  tasks: state.tasks.tasks
}), {
  fetchTasks,
  createTask,
  updateTask,
  destroyTask
})
@CSSModules(styles)
export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    destroyTask: PropTypes.func.isRequired
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
    this.props.updateTask(id, {
      ...task,
      completed: !status
    });
  }

  handleSave = (task) => {
    this.props.createTask(task);
  }

  handleDestroy = (id) => {
    this.props.destroyTask(id);
  }

  buildTasksList(tasks) {
    return tasks.map((task, i) => {
      return (
        <li key={i}>
          <Link to={`/admin/task/${task.id}`}>
            {task.title}
          </Link>
          <div>
            <Link to={`/admin/task/${task.id}/edit`}>
              Edit
            </Link>
            &nbsp;|&nbsp;
            <button onClick={this.toggleCompleted.bind(this, task.id, task.completed)}>
              {task.completed ? 'Mark active' : 'Mark done'}
            </button>
            &nbsp;|&nbsp;
            <button onClick={this.handleDestroy.bind(this, task.id)}>
              Destroy
            </button>
          </div>
        </li>
      );
    });
  }

  buildTasksContainer(tasks, isActive) {
    if (!tasks || !tasks.length) return false;

    let taskLists = this.buildTasksList(tasks);

    return(
      <div>
        <h4>{isActive ? 'Active tasks' : 'Completed tasks'}</h4>
        <ul>{taskLists}</ul>
      </div>
    );
  }

  render() {
    const { task } = this.state;
    const { tasks } = this.props;

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    let activeTasksContainer = this.buildTasksContainer(activeTasks, true);
    let completedTasksContainer = this.buildTasksContainer(completedTasks, false);

    return(
      <div>

        <div>
          <h2>Tasks List</h2>
          <div>
            {activeTasksContainer}
            {completedTasksContainer}
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
