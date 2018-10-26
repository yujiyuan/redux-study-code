import React, { Component } from "react";
import { createStore, combineReducers } from "redux";
import { connect, Provider } from "react-redux";

//定义action使用的常量
const ADD = "ADD";
const TOGGLE_TODO = "TOGGLE_TODO";
const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};
//action创建函数
const addMessage = message => {
  return {
    type: ADD,
    message: message,
    id: new Date().getTime()
  };
};

const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id
  };
};

const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});
//reducer
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        { message: action.message, id: action.id, completed: false }
      ];
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  console.log("filter", state);
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const getVisibleTodos = (todos, filter = "SHOW_ALL") => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};
const rootReducer = combineReducers(messageReducer, visibilityFilter);
//通过redux提供的createStore()方法创建store
const store = createStore(rootReducer);
// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const { input } = this.state;
    const { submitNewMessage } = this.props;
    submitNewMessage(input);
    this.setState({
      input: ""
    });
  }
  render() {
    return (
      <div>
        <h2>TODO</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.submitMessage}>Submit</button>
        <br />
        <div>
          <span>Show: </span>
          <span
            onClick={() =>
              this.props.setVisibilityFilter(VisibilityFilters.SHOW_ALL)
            }
          >
            All
          </span>
          <span
            onClick={() =>
              this.props.setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE)
            }
          >
            Active
          </span>
          <span
            onClick={() =>
              this.props.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED)
            }
          >
            Completed
          </span>
        </div>
        <ul>
          {typeof this.props.messages !== {} &&
            this.props.messages.map((message, idx) => {
              console.log("mess", message);
              return (
                <li
                  style={{
                    textDecoration: message.completed ? "line-through" : "none"
                  }}
                  key={message.id}
                  onClick={() => {
                    this.props.toggleTodo(message.id);
                  }}
                >
                  {message.message}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state,
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    submitNewMessage: message => {
      dispatch(addMessage(message));
    },
    toggleTodo: id => dispatch(toggleTodo(id)),
    setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter))
  };
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);
class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default AppWrapper;
