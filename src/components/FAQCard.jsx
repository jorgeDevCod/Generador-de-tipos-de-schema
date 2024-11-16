import React from 'react';
import { Input } from './Input';
import { Plus, Minus } from 'lucide-react';

const FAQCard = ({ data, onChange }) => {
  const addQuestion = () => {
    const newData = { 
      ...data,
      mainEntity: [...(data.mainEntity || []), { name: '', acceptedAnswer: { text: '' } }]
    };
    onChange(newData);
  };

  const removeQuestion = (index) => {
    const newMainEntity = [...data.mainEntity];
    newMainEntity.splice(index, 1);
    onChange({ ...data, mainEntity: newMainEntity });
  };

  const updateQuestion = (index, field, value) => {
    const newMainEntity = [...(data.mainEntity || [])];
    if (field === 'question') {
      newMainEntity[index] = { ...newMainEntity[index], name: value };
    } else {
      newMainEntity[index] = { 
        ...newMainEntity[index], 
        acceptedAnswer: { ...newMainEntity[index]?.acceptedAnswer, text: value }
      };
    }
    onChange({ ...data, mainEntity: newMainEntity });
  };

  return (
    <div className="space-y-4">
      {(data.mainEntity || []).map((item, index) => (
        <div key={index} className="p-4 border rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Pregunta {index + 1}</h4>
            <button
              onClick={() => removeQuestion(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Minus size={20} />
            </button>
          </div>
          <Input
            label="Pregunta"
            value={item.name || ''}
            onChange={(e) => updateQuestion(index, 'question', e.target.value)}
          />
          <Input
            label="Respuesta"
            type="textarea"
            value={item.acceptedAnswer?.text || ''}
            onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
      >
        <Plus size={20} />
        <span>Agregar Pregunta</span>
      </button>
    </div>
  );
};

export default FAQCard;