// components/SchemaAccordion.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SchemaAccordion = ({ schemaType, children, onClear, generateJSONLD }) => {
  const [isOpen, setIsOpen] = useState(true);

  const exportSchema = () => {
    const jsonLD = generateJSONLD();
    const blob = new Blob([jsonLD], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schemaType}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          <h2 className="text-xl font-semibold">{schemaType}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Limpiar
          </button>
          <button
            onClick={exportSchema}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Exportar
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">JSON-LD Generado:</h3>
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <code>{generateJSONLD()}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaAccordion;