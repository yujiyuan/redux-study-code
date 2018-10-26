/*
 * @Description: 按条件展示待办项列表
 * @Author: your name
 * @Date: 2018-10-25 16:00:00
 * @LastEditTime: 2018-10-25 16:58:06
 * @LastEditors: your name
 */
import React, { Component } from "react";
import { connect } from "react-redux";
//引入actionCreators
import actions from "../store/actions";
class TodoList extends Component {
  state = {
    value: ""
  };
  //按display条件过滤数据
  filterDisplay = () => {
    return this.props.todos.filter(item => {
      console.log("this.props.display", this.props.display);
      switch (this.props.display) {
        case "completed":
          return item.isComplete;
        case "uncompleted":
          return !item.isComplete;
        case "all":
        default:
          return true;
      }
    });
  };
  todoChange = event => {
    //当onChange事件发生时，调用toggleComplete动作
    this.props.toggleComplete(event.target.value);
    // this.props.dispatch(actions.toggleComplete(id));
  };
  getTodo = () => {
    return this.filterDisplay().map((todo, index) => {
      return (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            value={todo.id}
            onChange={this.todoChange}
          />
          {todo.isComplete ? (
            <del>{todo.title}</del>
          ) : (
            <span>{todo.title}</span>
          )}
          {/* <button type="button" data-id={todo.id}>
              删除
            </button> */}
        </li>
      );
    });
  };
  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.onChange} />
        <button
          type="button"
          onClick={() => {
            this.props.addTodo(this.state.value);
          }}
        >
          添加
        </button>
        <ul>{this.getTodo()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleComplete: id => {
      dispatch(actions.toggleComplete(id));
    },
    addTodo: value => {
      dispatch(actions.addTodo(value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
