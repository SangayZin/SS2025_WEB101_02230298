// src/App.js
import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import useTodoStore from '..todostore.js';

function App() {
    const todoCount = useTodoStore(state => state.todos.length);
    const completedCount = useTodoStore(
        state => state.todos.filter(todo => todo.completed).length
    );

    return (
        <div className="App">
            <h1>Todo List Sonam </h1>

            <TodoInput />

            <div>
                <p>Total Todos: {todoCount}</p>
                <p>Completed: {completedCount}</p>
            </div>

            <TodoList />
        </div>
    );
}

export default App;