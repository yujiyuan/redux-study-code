/*
 * @Description: 定义reducer
 * @Author: your name
 * @Date: 2018-10-25 16:03:33
 * @LastEditTime: 2018-10-25 16:59:42
 * @LastEditors: your name
 */
import {
  ADD_TODO,
  TOGGLE_COMPLETE,
  CHANGE_DISPLAY
} from "../actions/action-type/action-type";

//设置默认state
let initState = {
  //display用于控制待办项列表的显示
  display: "all",
  todos: [
    {
      id: new Date().getTime(),
      isComplete: false,
      title: "学习redux"
    }
  ]
};

function reducer(state = initState, action) {
  let newState = null;
  switch (action.type) {
    case ADD_TODO:
      newState = {
        todos: [
          ...state.todos,
          {
            id: new Date().getTime(),
            isComplete: false,
            title: action.value
          }
        ]
      };
      break;
    case TOGGLE_COMPLETE:
      newState = {
        //循环每一条待办，把要修改的记录更新
        todos: state.todos.map(item => {
          if (item.id == action.payload) {
            item.isComplete = !item.isComplete;
          }
          return item;
        })
      };
      break;
    case CHANGE_DISPLAY:
      newState = {
        display: action.payload,
        todos: [...state.todos]
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
export default reducer;
