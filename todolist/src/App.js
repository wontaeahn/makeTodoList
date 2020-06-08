import React, { Component } from 'react';
import './App.css';
import TodoListTemplate from './component/TodoListTemplate';
import Form from './component/form/Form';
import TodoItemList from './component/todolist/TodoItemList';

export class App extends Component {

  id = 0;z

  state = {
    input: '',
    todos: []}

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleCreate = () => {
    const { input, todos} = this.state;
    this.setState({
      todos: todos.concat({
        id: this.id++,
        text: input,
        ckecked: false
      })
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    const index = todos.findIndex(todos => todos.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }


  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {

    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
      <Form
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App


