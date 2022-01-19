import React from 'react'
import './TodoList.css'

const TodoList = (props) => {
    const { list, createTodo } = props

    const input = {
        input: {
          name: 'New Todo',
          description: 'New todo details'
        }
    }

    return (
        <div className='TodoList'>
            <button className='create-todo-button' onClick={() => createTodo(input)}>Add ToDo</button>
            <div className='list'>
                {list.map((item, index) => {
                    return (
                        <div className="todo-item" key={index}>
                            <h3>{item.name}</h3>
                            <p>{item.description && item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TodoList