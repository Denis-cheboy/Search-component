
import React, { useState, useEffect } from 'react';
import {List} from './components/lists/Lists.tsx'
import "./App.css"

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        setError('Failed to fetch data, something went wrong');
      }
      const data = await response.json();
      setItems(data);
      setError(null);
    }
    catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch data. Please try again later.');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className='title'>My Todo List</h1>
      {loading && <p className="loading">Loading todos...</p>}
      {error && <p className="error">{error}</p>}
      <div className="todo-container">
        <List items={items} displayKey="title" />
        <List items={items} displayKey="completed"/>
      </div>
    </div>
  );
};

export default App;
