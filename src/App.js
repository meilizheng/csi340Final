import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  // Fetch data from json-server or API
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/items');
      setItems(result.data);
    };
    fetchData();
  }, []);

  // Handle form submission to add new items
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:5000/items', newItem);
    setItems([...items, result.data]);
    setNewItem({ name: '', description: '' });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  return (
    <div>
      <h1>Dynamic Rendering App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Item Description"
        />
        <button type="submit">Add Item</button>
      </form>
      <ItemList items={items} />
    </div>
  );
};

export default App;
