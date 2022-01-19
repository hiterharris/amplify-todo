import React, { useState, useEffect } from 'react'
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports';
import { listTodos } from './graphql/queries'
import { createTodo } from './graphql/mutations'
import { TodoList } from './components'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const App = ({ signOut, user }) => {
  const [todoList, setTodoList] = useState([])

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = await todoData.data.listTodos.items
      setTodoList(todos)
    } catch (error) { console.log('error fetching todos: ', error) }
  }

  useEffect(() => {
    fetchTodos()
  }, [todoList])

  const addTodo = async (input) => {
    try {
      await API.graphql(graphqlOperation(createTodo, input))
      } catch (error) { console.log('error adding todo: ', error) }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-header-title'>To Do</h1>
        <button className='sign-out-button' onClick={signOut}>Sign out</button>
      </header>
      <TodoList list={todoList} createTodo={addTodo} />
      <div>
      </div>
    </div>
  );
}

export default withAuthenticator(App)
