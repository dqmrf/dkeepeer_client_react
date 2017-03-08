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
      }
    };

    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentWillMount() {
    const { store } = this.context;
    return store.dispatch(fetchTasks());
  }

  toggleCompleted = (id, status) => {
    const task = this.props.tasks.find(task => task.id === id);
    this.props.updateTask(id, {
      ...task,
      completed: !status
    });
  }

  handleSave = task => {
    this.props.createTask(task);
  }

  handleDestroy = id => {
    switch (typeof id) {
      case 'number': {
        this.props.destroyTask(id);
      }
      case 'object': {
        this.props.destroyTasks(id);
      }
      default: {
        return false;
      }
    }
  }

  render() {
    const { task } = this.state;
    const { tasks, isFetched } = this.props;
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return(
      <div className={`row ${isFetched ? '' : ' fetching'}`}>

        <div className="col-md-8">
          <h2>Tasks List</h2>

          <div>
            <TasksContainer
              tasks={activeTasks}
              isActive={true}
              toggleCompleted={this.toggleCompleted}
              handleDestroy={this.handleDestroy}
            />
            <TasksContainer
              tasks={completedTasks}
              isActive={false}
              toggleCompleted={this.toggleCompleted}
              handleDestroy={this.handleDestroy}
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
