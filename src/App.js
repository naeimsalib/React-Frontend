import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/todos/`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) {
      setMessage('Please enter a valid item.');
      return;
    }

    const normalizedTitle = title.trim().toLowerCase();
    const duplicate = todos.some(todo => todo.title.toLowerCase() === normalizedTitle);

    if (duplicate) {
      setMessage('Item already exists.');
      return;
    }

    try {
      const newTodo = { title, completed: false };
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todos/`, newTodo);
      setTodos([...todos, response.data]);
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error adding todo:', error);
      setMessage('Error adding item.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${id}/`);
      setTodos(todos.filter(todo => todo.id !== id));
      setMessage('');
    } catch (error) {
      console.error('Error deleting todo:', error);
      setMessage('Error deleting item.');
    }
  };

  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add Item</button>
      </div>
      {message && <p className="message">{message}</p>}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {todo.title}
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
      <footer>
        <p>Created by Naeim Salib <span>&#8482;</span></p>
      </footer>
    </div>
  );
};

export default App;
