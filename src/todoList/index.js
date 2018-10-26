import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import TodoHeader from "./components/todo-header";
import TodoList from "./components/todo-list";
import TodoFooter from "./components/todo-footer";

class Todo extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </div>
      </Provider>
    );
  }
}

export default Todo;
