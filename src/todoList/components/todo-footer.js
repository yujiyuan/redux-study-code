/*
 * @Description: 功能按钮（显示全部、未完成、已完成）
 * @Author: your name
 * @Date: 2018-10-25 16:00:24
 * @LastEditTime: 2018-10-25 16:51:28
 * @LastEditors: your name
 */
import React, { Component } from "react";
import { connect } from "react-redux";
//引入actionCreators
import actions from "../store/actions";
class TodoFooter extends Component {
  changeDisplay = display => {
    this.props.changeDisplay(display);
  };
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.changeDisplay("all");
          }}
        >
          全部
        </button>
        <button
          type="button"
          onClick={() => {
            this.changeDisplay("uncompleted");
          }}
        >
          未完成
        </button>
        <button
          type="button"
          onClick={() => {
            this.changeDisplay("completed");
          }}
        >
          已完成
        </button>
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
    changeDisplay: display => {
      dispatch(actions.changeDisplay(display));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFooter);
