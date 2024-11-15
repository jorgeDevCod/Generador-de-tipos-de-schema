import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import DataCard from './components/DataCard';
import SchemaAccordion from './components/SchemaAccordion';
import { schemaFields } from './utils/schemaFields';

const App = () => {
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState({});

  const validateSchema = (type, data) => {
    const schema = schemaFields[type];
    const newErrors = {};
    
    schema.required.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        newErrors[field] = 'Este campo es requerido';
      }
    });

    return newErrors;
  };

  const handleDataChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index].data[field] = value;
    
    const newErrors = validateSchema(newCards[index].type, newCards[index].data);
    setErrors({ ...errors, [index]: newErrors });
    
    setCards(newCards);
  };

  const generateJSONLD = (schemaType) => {
    const filteredCards = cards.filter((card) => card.type === schemaType);
    
    const jsonLD = filteredCards.map(card => ({
      "@context": "https://schema.org",
      "@type": schemaType,
      ...card.data
    }));

    return `<script type="application/ld+json">\n${JSON.stringify(jsonLD, null, 2)}\n</script>`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Generador de Datos Estructurados JSON-LD
      </h1>
      
      <div className="flex justify-center space-x-4">
        <Dropdown onAddCard={(type) => {
          setCards([...cards, { type, data: {}, id: Date.now() }]);
        }} />
      </div>

      <div className="mt-6">
        {[...new Set(cards.map(card => card.type))].map((schemaType) => {
          const filteredCards = cards.filter(card => card.type === schemaType);
          
          return (
            filteredCards.length > 0 && (
              <SchemaAccordion
                key={schemaType}
                schemaType={schemaType}
                onClear={() => setCards(cards.filter(c => c.type !== schemaType))}
                generateJSONLD={() => generateJSONLD(schemaType)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCards.map((card, index) => (
                    <div key={card.id} className="w-full">
                      <DataCard
                        index={index}
                        type={card.type}
                        data={card.data}
                        errors={errors[index] || {}}
                        onDataChange={handleDataChange}
                        onRemove={() => setCards(cards.filter(c => c.id !== card.id))}
                        onDuplicate={() => {
                          setCards([...cards, { ...card, id: Date.now(), data: { ...card.data } }]);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </SchemaAccordion>
            )
          );
        })}
      </div>
    </div>
  );
};

export default App;