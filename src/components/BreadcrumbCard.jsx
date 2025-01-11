import React from 'react';
import { Input } from './Input';
import { Plus, Minus } from 'lucide-react';

const BreadcrumbCard = ({ data, onChange }) => {
  const addItem = () => {
    const currentItems = data.itemListElement || [];
    const newItem = {
      position: currentItems.length + 1,
      name: '',
      item: ''
    };
    
    onChange({
      ...data,
      itemListElement: [...currentItems, newItem]
    });
  };

  const removeItem = (index) => {
    const newItems = [...(data.itemListElement || [])];
    newItems.splice(index, 1);
    
    // Actualizar las posiciones
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      position: idx + 1
    }));

    onChange({
      ...data,
      itemListElement: updatedItems
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...(data.itemListElement || [])];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    onChange({
      ...data,
      itemListElement: newItems
    });
  };

  return (
    <div className="space-y-4">
      {(data.itemListElement || []).map((item, index) => (
        <div key={index} className="p-4 border rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Elemento {index + 1}</h4>
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Minus size={20} />
            </button>
          </div>
          <Input
            label="Nombre"
            value={item.name || ''}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
          />
          <Input
            label="URL"
            type="url"
            value={item.item || ''}
            onChange={(e) => updateItem(index, 'item', e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
      >
        <Plus size={20} />
        <span>Agregar Elemento</span>
      </button>
    </div>
  );
};

export default BreadcrumbCard;
