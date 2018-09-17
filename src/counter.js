import { createStore } from "redux";

//定义action
/**
 * action 创建函数
 */


const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
export function increment() {
  return {
      type: INCREMENT
  }
}
export function decrement() {
    return {
        type: DECREMENT
    }
}
//定义初始的state
const initalState = {counter:0};

//定义reducers
function counter(state = initalState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}


//创建store
const store = createStore(counter);

//获取 state
console.log("preState",store.getState());

//监听store的变化

const unsubscribe = store.subscribe(()=>console.log("nextState",store.getState()))


//发起action
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(decrement())


//注销action的监听
unsubscribe();