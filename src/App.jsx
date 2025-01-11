// App.js
import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import DataCard from "./components/DataCard";
import SchemaAccordion from "./components/SchemaAccordion";
import { schemaFields } from "./utils/schemaFields";

const App = () => {
  const [cards, setCards] = useState([]);
  const [ errors, setErrors ] = useState( {} );


  const validateSchema = (type, data) => {
    const schema = schemaFields[type];
    const newErrors = {};

    if (type === "Course") {
      if (
        !data.hasCourseInstance ||
        !Array.isArray(data.hasCourseInstance) ||
        data.hasCourseInstance.length === 0
      ) {
        newErrors.hasCourseInstance =
          "Debe incluir al menos una instancia del curso.";
      }
      data.hasCourseInstance?.forEach((instance, idx) => {
        if (!instance.location || !instance.location.name) {
          newErrors[`hasCourseInstance[${idx}].location.name`] =
            "El nombre de la ubicación es obligatorio.";
        }
      });
    }

    schema.required.forEach((field) => {
      if (field === "mainEntity" || field === "itemListElement") {
        if (
          !data[field] ||
          !Array.isArray(data[field]) ||
          data[field].length === 0
        ) {
          newErrors[field] = "Debe agregar al menos un elemento";
        }
      } else {
        if (
          !data[field] ||
          (typeof data[field] === "string" && data[field].trim() === "")
        ) {
          newErrors[field] = "Este campo es requerido";
        }
      }
    });

    return newErrors;
  };

  const handleDataChange = (index, field, value) => {
    const newCards = [...cards];

    if (field === "itemListElement") {
      newCards[index].data[field] = Array.isArray(value) ? value : [];
    } else {
      newCards[index].data[field] = value;
    }

    // Normaliza hasCourseInstance si es necesario
    if (newCards[index].type === "Course") {
      newCards[index].data.hasCourseInstance = Array.isArray(
        newCards[index].data.hasCourseInstance
      )
        ? newCards[index].data.hasCourseInstance
        : [];
    }

    const newErrors = validateSchema(
      newCards[index].type,
      newCards[index].data
    );
    setErrors({ ...errors, [index]: newErrors });

    setCards(newCards);
  };

  const generateJSONLD = (schemaType) => {
    const filteredCards = cards.filter((card) => card.type === schemaType);

    const jsonLD = filteredCards.map((card) => {
      const formattedData = { ...card.data };

      if (schemaType === "Course") {
        formattedData.provider = {
          "@type": "Organization",
          ...formattedData.provider,
        };

        formattedData.offers = {
          "@type": "Offer",
          ...formattedData.offers,
        };

        // Verificar que hasCourseInstance sea un arreglo válido
        formattedData.hasCourseInstance = Array.isArray(
          formattedData.hasCourseInstance
        )
          ? formattedData.hasCourseInstance.map((instance) => ({
              "@type": "CourseInstance",
              ...instance,
              location: {
                "@type": "Place",
                ...instance.location,
              },
            }))
          : [];
      }

      return {
        "@context": "https://schema.org",
        "@type": schemaType,
        ...formattedData,
      };
    });

    return `<script type="application/ld+json">\n${JSON.stringify(
      jsonLD,
      null,
      2
    )}\n</script>`;
  };


  const getUniqueSchemaTypes = () => {
    return [...new Set(cards.map((card) => card.type))];
  };

  const handleClear = (schemaType) => {
    setCards(cards.filter((card) => card.type !== schemaType));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Generador de Datos Estructurados JSON-LD
      </h1>

      <div className="flex justify-center space-x-4">
        <Dropdown
          onAddCard={(type) => {
            const newCard = {
              type,
              data: type === "BreadcrumbList" ? { itemListElement: [] } : {},
              id: Date.now(),
            };
            setCards([...cards, newCard]);
          }}
        />
      </div>

      <div className="mt-6">
        {getUniqueSchemaTypes().map((schemaType) => {
          const schemaCards = cards.filter((card) => card.type === schemaType);

          return (
            <SchemaAccordion
              key={schemaType}
              schemaType={schemaType}
              onClear={() => handleClear(schemaType)}
              generateJSONLD={() => generateJSONLD(schemaType)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {schemaCards.map((card, index) => {
                  const cardIndex = cards.findIndex((c) => c.id === card.id);
                  return (
                    <div key={card.id} className="w-full">
                      <DataCard
                        index={cardIndex}
                        type={card.type}
                        data={card.data}
                        errors={errors[cardIndex] || {}}
                        onDataChange={handleDataChange}
                        onRemove={() =>
                          setCards(cards.filter((c) => c.id !== card.id))
                        }
                        onDuplicate={() => {
                          const newCard = {
                            ...card,
                            id: Date.now(),
                            data: {
                              ...card.data,
                              itemListElement:
                                card.type === "BreadcrumbList"
                                  ? [...(card.data.itemListElement || [])]
                                  : card.data.itemListElement,
                            },
                          };
                          setCards([...cards, newCard]);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </SchemaAccordion>
          );
        })}
      </div>
    </div>
  );
};

export default App;
