import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(`${API_BASE_URL}/api/todos/`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const addItem = (event) => {
    event.preventDefault();
    if (items.some(item => item.title.toLowerCase() === newItem.toLowerCase())) {
      setError('Item already exists');
      return;
    }
    fetch(`${API_BASE_URL}/api/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newItem, description: '', completed: false }),
    })
      .then(response => response.json())
      .then(data => {
        setItems([...items, data]);
        setNewItem('');
        setError(null);
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (id) => {
    fetch(`${API_BASE_URL}/api/todos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="container">
      <h1>My ToDo List</h1>
      <form onSubmit={addItem} className="item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button type="submit" className="add-button">Add Item</button>
        {error && <p className="error">{error}</p>}
      </form>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            {item.title}
            <button onClick={() => deleteItem(item.id)} className="delete-button">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
