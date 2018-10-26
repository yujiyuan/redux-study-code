import {
  ADD_TODO,
  TOGGLE_COMPLETE,
  CHANGE_DISPLAY
} from "./action-type/action-type";

let actions = {
  addTodo: value => {
    return {
      type: ADD_TODO,
      value
    };
  },
  //更改完成状态，此处payload传id
  toggleComplete: function(payload) {
    return { type: TOGGLE_COMPLETE, payload };
  },
  //更改显示待办项的状态，
  //payload为以下3个值（all,uncompleted,completed）
  changeDisplay: function(payload) {
    return { type: CHANGE_DISPLAY, payload };
  }
};

export default actions;
