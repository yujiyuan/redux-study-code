/*
 * @Description: 用于展示未办数量和添加待办
 * @Author: your name
 * @Date: 2018-10-25 15:59:03
 * @LastEditTime: 2018-10-25 16:14:04
 * @LastEditors: your name
 */

import React, { Component } from "react";
import { connect } from "react-redux";

class TodoHeader extends Component {
  //取得未完成的todo数量
  getUnfinishedCount() {
    //this.props.todos就是从connect传入的state数据
    return this.props.todos.filter(i => {
      return i.isComplete === false;
    }).length;
  }
  render() {
    return (
      <div>
        <div>
          您有
          {this.getUnfinishedCount()}
          件事未完成
        </div>
      </div>
    );
  }
}

let ConnectedTodoHeader = connect(state => ({
  ...state
}))(TodoHeader);

export default ConnectedTodoHeader;
