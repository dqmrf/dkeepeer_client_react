import styles               from './styles.styl';
import CSSModules           from 'react-css-modules';
import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import TaskForm             from '../Tasks/TaskForm';
import TasksContainer       from '../Tasks/TasksContainer';
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

  render() {
    const { task } = this.state;
    const { tasks } = this.props;

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return(
      <div>

        <div className="col-md-8">
          <h2>Tasks List</h2>

          <div>
            <TasksContainer
              tasks={activeTasks}
              isActive={true}
              toggleCompleted={this.toggleCompleted.bind(this)}
              handleDestroy={this.handleDestroy.bind(this)}
            />
            <TasksContainer
              tasks={completedTasks}
              isActive={false}
              toggleCompleted={this.toggleCompleted.bind(this)}
              handleDestroy={this.handleDestroy.bind(this)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <TaskForm
            task={task}
            onSave={this.handleSave}
          />
        </div>

      </div>
    );
  }
}
