#  Practical 6 – Todo List Application with Zustand 

This project showcases a Todo List Application built with React and Zustand to demonstrate efficient global state management without the overhead of prop drilling or complex context setups.

## Key Features

-  Add tasks to your list

-  Mark tasks as complete or incomplete

-  Delete specific tasks

-  Remove all completed tasks

-  Save tasks using localStorage for persistence

-  Fully responsive and mobile-friendly UI

##  Tools & Technologies

React – For building user interfaces

Zustand – Lightweight state management

Vite – Development tool for fast builds

CSS – For styling components

##  Getting Started

### Step 1: Initialize Vite Project
```bash
npx create-vite@latest todo-zustand
cd todo-zustand
```

### Step 2: Install Zustand
```bash
npm install zustand
```

### Step 3: Install Other Dependencies
```bash
npm install
```

### Step 4: Start the Development Server
```bash
npm run dev
```

##  Folder Structure
```
src/
├── components/
│   ├── TodoInput.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── store/
│   └── todoStore.js
├── App.jsx
├── index.js
└── App.css
```

##  Implementation Steps

### 🔹 Step 1: Zustand Store Setup
**File:** `src/store/todoStore.js`

```js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) => set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      })),

      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),

      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      }))
    }),
    {
      name: 'todo-storage'
    }
  )
)

export default useTodoStore
```

### 🔹 Step 2: TodoInput Component
**File:** `src/components/TodoInput.jsx`

```jsx
import { useState } from 'react'
import useTodoStore from '../store/todoStore'

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button type="submit" className="add-button">Add ➕</button>
    </form>
  )
}

export default TodoInput
```

### 🔹 Step 3: TodoItem Component
**File:** `src/components/TodoItem.jsx`

```jsx
import useTodoStore from '../store/todoStore'

const TodoItem = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodoStore(state => ({
    toggleTodo: state.toggleTodo,
    removeTodo: state.removeTodo
  }))

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => removeTodo(todo.id)} className="remove-button">
        🗑️
      </button>
    </div>
  )
}

export default TodoItem
```

### 🔹 Step 4: TodoList Component
**File:** `src/components/TodoList.jsx`

```jsx
import useTodoStore from '../store/todoStore'
import TodoItem from './TodoItem'

const TodoList = () => {
  const { todos, clearCompleted } = useTodoStore(state => ({
    todos: state.todos,
    clearCompleted: state.clearCompleted
  }))

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-list-container">
      <div className="todo-stats">
        <span>Total: {totalCount} | Completed: {completedCount}</span>
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-button">
            Clear Completed 🧹
          </button>
        )}
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default TodoList
```