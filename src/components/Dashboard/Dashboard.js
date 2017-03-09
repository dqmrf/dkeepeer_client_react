import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import TaskForm             from '../Tasks/TaskForm';
import TasksContainer       from '../Tasks/TasksContainer';
import { 
  fetchTasks,
  createTask,
  updateTask,
  destroyTask,
  destroyTasks }            from '../../actions/tasks';
import './Dashboard.styl';

@connect(state => ({
  tasks: state.tasks.tasks || [],
  isFetched: state.tasks.fetched,
}), {
  fetchTasks,
  createTask,
  updateTask,
  destroyTask,
  destroyTasks
})
export default class Dashboard extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    destroyTask: PropTypes.func.isRequired,
    destroyTasks: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      task: {
        title: '',
        description: '',
        priority: '',
        due_date: '',
        completed: false
      },
      tasks: this.getTasksState(props),
      checkedTasks: {
        active: [],
        completed: []
      }
    };

    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.updateTasksState = this.updateTasksState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tasks: this.getTasksState(newProps),
    });
  }

  componentWillMount() {
    const { store } = this.context;

    return store.dispatch(fetchTasks());
  }

  getTasksState(props) {
    return {
      all: [ ...props.tasks ],
      active: [ ...props.tasks.filter(t => !t.completed) ],
      completed: [ ...props.tasks.filter(t => t.completed) ],
    }
  }

  toggleCompleted = (id, status, i) => {
    const task = this.props.tasks.find(task => task.id === id);
    const taskId = task.id;
    const { checkedTasks } = this.state;
    const { active, completed } = checkedTasks;

    let activeTasks = active;
    let completedTasks = completed;

    let updated = this.props.updateTask.bind(this, id, {
      ...task,
      completed: !status
    });

    if (status) {
      if (completed.includes(taskId)) {
        completedTasks.splice(i, 1);
        activeTasks.push(taskId);
      }
    } else {
      if (active.includes(taskId)) {
        activeTasks.splice(i, 1);
        completedTasks.push(taskId);
      }
    }

    if (updated()) {
      this.setState({ checkedTasks: {
        ...this.state.checkedTasks,
        active: activeTasks,
        completed: completedTasks,
      } });
    }
  }

  updateTasksState = (tasks, isActive, isChecked=false) => {
    if (!tasks) return;

    let stateField = isChecked ? 'checkedTasks' : 'tasks';
    let field = isActive ? 'active' : 'completed';

    this.setState({ [stateField]: {
      ...this.state[stateField],
      [field]: tasks
    } });
  }

  handleSave = task => {
    this.props.createTask(task);
  }

  handleDestroy = id => {
    switch (typeof id) {
      case 'number': {
        this.props.destroyTask(id);
        return;
      }
      case 'object': {
        this.props.destroyTasks(id);
        return;
      }
      default: {
        return false;
      }
    }
  }

  render() {
    const { task, tasks, checkedTasks } = this.state;
    const activeTasks = tasks.active;
    const completedTasks = tasks.completed;
    const { isFetched } = this.props;

    let functions = {
      toggleCompleted: this.toggleCompleted,
      updateTasksState: this.updateTasksState,
      handleDestroy: this.handleDestroy
    };

    return(
      <div className={`row ${isFetched ? '' : ' fetching'}`}>

        <div className="col-md-8">
          <h2>Tasks List</h2>

          <div>
            <TasksContainer
              tasks={activeTasks}
              checkedTasks={checkedTasks.active}
              isActive={true}
              functions={functions}
            />
            <TasksContainer
              tasks={completedTasks}
              checkedTasks={checkedTasks.completed}
              isActive={false}
              functions={functions}
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
