import React, { useState } from 'react';
import './AddItemForm.css';

function AddItemForm({ addItem }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      addItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-box"
      />
      <button type="submit" className="add-button">Add Item</button>
    </form>
  );
}

export default AddItemForm;
