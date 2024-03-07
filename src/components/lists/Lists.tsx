import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './Lists.css'

interface ListItem {
  [key: string]: any
}

interface ListProps {
  items: ListItem[]
  displayKey: string
}

export const List: React.FC<ListProps> = ({ items, displayKey }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos=items?.filter(item => {
    return String(item[displayKey])?.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase())
  })
  

  return (
    <div className="list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder={`Search by ${displayKey}...`}
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch />
      </div>
      <ul className="item-list">
        {
          filteredTodos?.map((item, index) => (
            <li key={index}>
              <p><b>Title</b> : {item.title}</p>
              <p><b>Completed </b>: {String(item.completed)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};


