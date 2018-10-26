import { createStore } from "redux";
import reducer from "./reducers/index";
let store = createStore(reducer); //传入reducer，构建store
export default store;
