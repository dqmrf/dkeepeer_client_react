import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import DatePicker                from 'react-datepicker'
import Moment                    from 'moment';
import { fetchTask, updateTask } from '../../actions/tasks';
import FormInput                 from '../Layout/Form/Input';
import FormTextarea              from '../Layout/Form/Textarea';
import FormDatePicker            from '../Layout/Form/DatePicker';
import extractPropertyFromObject from '../../utils/extractPropertyFromObject';

@connect(state => ({
  task: state.tasks.task
}), {
  fetchTask,
  updateTask
})
export default class TaskEditor extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    
    this.taskState = {
      title: {
        value: '',
        blured: false,
      },
      description: {
        value: '',
        blured: false,
      },
      priority: {
        value: '',
        blured: false,
      },
      due_date: {
        value: '',
        blured: false,
      },
      completed: {
        value: false,
        blured: false,
      },
    };

    this.state = {
      task: this.taskState,
      startDate: Moment(),
      canSubmit: true
    };
  }

  componentDidMount() {
    const { store } = this.context;
    const { id } = this.props.params;

    if (id) {
      return store.dispatch(fetchTask(id));
    }
  }

  componentWillReceiveProps(newProps) {
    const { task } = newProps;

    this.setState((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        title: {
          ...prevState.task.title,
          value: task.title
        },
        description: {
          ...prevState.task.description,
          value: task.description
        },
        priority: {
          ...prevState.task.priority,
          value: task.priority
        },
        due_date: {
          ...prevState.task.due_date,
          value: task.due_date
        },
        completed: {
          ...prevState.task.completed,
          value: task.completed
        }
      },
      startDate: Moment(task.due_date)
    }));
  }

  handleChange = (field, values) => {
    this.setState((prevState) => ({
      task: {
        ...prevState.task,
        [field]: {
          ...prevState.task[field],
          ...values
        }
      }
    }));
  }

  handleSubmit = model => {
    const { id } = this.props.params;
    const { task } = this.state;
    const taskValues = extractPropertyFromObject(task, 'value');

    this.props.updateTask(id, taskValues);
  }

  handleDateChange = e => {
    const date = e._d;

    this.setState((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        due_date: {
          ...prevState.task.due_date,
          value: date
        }
      },
      startDate: e
    }));
  }

  resetForm() {
    this.refs.form.reset();
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <Formsy.Form 
            ref='form'
            onValidSubmit={this.handleSubmit} 
            onValid={this.enableButton} 
            onInvalid={this.disableButton}
          >

            <FormInput 
              title="Title"
              name="title"
              value={title.value}
              isBlured={title.blured}
              handleChange={this.handleChange}
              validationErrors={{
                isRequired: "Title is required"
              }}
              required
            />

            <FormTextarea
              title="Description"
              name="description"
              value={description.value}
              isBlured={description.blured}
              handleChange={this.handleChange}
              validationErrors={{
                isRequired: "Description is required"
              }}
              rows="4"
              required
            />

            <FormInput
              title="Priority"
              name="priority"
              type="number"
              value={priority.value}
              isBlured={priority.blured}
              handleChange={this.handleChange}
              validations="isNumeric"
              validationErrors={{
                isNumeric: "Priority must be an integer",
                isRequired: "Priority is required"
              }}
              required
            />

            <FormDatePicker
              title="Due date"
              name="due_date"
              minDate={Moment()}
              value={this.state.startDate}
              selected={this.state.startDate}
              handleChange={this.handleDateChange}
              required
            />

            <button 
              type="submit" 
              className="btn btn-success"
              disabled={!this.state.canSubmit}
            >Update task</button>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}
