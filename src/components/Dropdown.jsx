// components/Dropdown.jsx
import React, { useState } from 'react';
import { schemaFields } from '../utils/schemaFields';

const Dropdown = ({ onAddCard }) => {
  const [selectedType, setSelectedType] = useState(Object.keys(schemaFields)[0]);

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {Object.keys(schemaFields).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        onClick={() => onAddCard(selectedType)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Agregar Schema
      </button>
    </div>
  );
};

export default Dropdown;