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
      tasks: this.getInitialTasksState(props),
      checkedTasks: {
        active: [],
        completed: []
      }
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.updateTasksState = this.updateTasksState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.tasks !== newProps.tasks) {
      this.setState({
        tasks: this.getInitialTasksState(newProps),
      });
    }
  }

  componentDidMount() {
    const { store } = this.context;

    return store.dispatch(fetchTasks());
  }

  getInitialTasksState(props) {
    const { tasks } = props;

    return {
      all: [ ...tasks ],
      active: [ ...tasks.filter(t => !t.completed) ],
      completed: [ ...tasks.filter(t => t.completed) ],
    }
  }

  toggleCompleted = (id, status, i) => {
    const task = this.props.tasks
      .find(task => task.id === id);
    const taskId = task.id;
    const { active, completed } = this.state.checkedTasks;

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
      this.setState((prevState) => ({
        checkedTasks: {
          ...prevState.checkedTasks,
          active: activeTasks,
          completed: completedTasks
        }
      }));
    }
  }

  updateTasksState = (tasks, isActive, isChecked=false) => {
    if (!tasks) return;

    let stateField = isChecked ? 'checkedTasks' : 'tasks';
    let field = isActive ? 'active' : 'completed';

    this.setState((prevState) => ({
      [stateField]: {
        ...prevState[stateField],
        [field]: tasks
      }
    }));
  }

  handleSave = task => {
    this.props.createTask(task);
  }

  handleDestroy = (id, params=false) => {
    switch (typeof id) {
      case 'number': {
        this.props.destroyTask(id);
        this.spliceCheckedTasks(id, params);
        return;
      }
      case 'object': {
        this.props.destroyTasks(id);
        this.spliceCheckedTasks(id, params);
        return;
      }
      default: {
        return false;
      }
    }
  }

  // TODO: fix this function.
  spliceCheckedTasks = (id, params=false) => {
    if (params && params.isActive) {
      const field = params.isActive ? 'active': 'completed';
      let checkedTasks = this.state.checkedTasks[field];
      let index = checkedTasks.indexOf(+id);

      if (index !== -1) {
        checkedTasks = checkedTasks.splice(index, -1);

        this.setState((prevState) => ({
          checkedTasks: {
            ...prevState.checkedTasks,
            [field]: checkedTasks
          }
        }));
      }
      
    }
  }

  render() {
    const { tasks, checkedTasks } = this.state;
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
            onSave={this.handleSave}
          />
        </div>

      </div>
    );
  }
}
