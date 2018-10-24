import React, { Component } from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

//定义action使用的常量
const ADD = "ADD";
//action创建函数
const addMessage = message => {
  return {
    type: ADD,
    message: message,
    id: new Date().getTime()
  };
};

//reducer
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, { message: action.message, id: action.id }];
    default:
      return state;
  }
};

//通过redux提供的createStore()方法创建store
const store = createStore(messageReducer);
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
        <h2>Type in a new Message:</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map((message, idx) => {
            console.log("mess", message);
            return <li key={message.id}>{message.message}</li>;
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { messages: state };
};
const mapDispatchToProps = dispatch => {
  return {
    submitNewMessage: message => {
      dispatch(addMessage(message));
    }
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