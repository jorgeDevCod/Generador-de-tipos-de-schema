import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Trash2 } from 'lucide-react';
import { Input } from './Input';
import { schemaFields } from '../utils/schemaFields';
import FAQCard from './FAQCard';
import BreadcrumbCard from './BreadcrumbCard';
import ArticleCard from './ArticleCard';
import WebSiteCard from './WebSiteCard';

const DataCard = ({
  index,
  type,
  data,
  errors,
  onDataChange,
  onRemove,
  onDuplicate,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const fields = schemaFields[type]?.fields || {};

  const handleSpecialTypeChange = (newData) => {
    switch(type) {
      case 'FAQPage':
        onDataChange(index, 'mainEntity', newData.mainEntity);
        break;
      case 'BreadcrumbList':
        onDataChange(index, 'itemListElement', newData.itemListElement);
        break;
      case 'Article':
      case 'WebSite':
        Object.entries(newData).forEach(([key, value]) => {
          onDataChange(index, key, value);
        });
        break;
      default:
        break;
    }
  };

  const handleInputChange = (fieldName, value) => {
    onDataChange(index, fieldName, value);
  };

  const renderFields = () => {
    switch(type) {
      case 'FAQPage':
        return (
          <FAQCard 
            data={data} 
            onChange={handleSpecialTypeChange} 
          />
        );
      case 'BreadcrumbList':
        return (
          <BreadcrumbCard 
            data={data} 
            onChange={handleSpecialTypeChange} 
          />
        );
      case 'Article':
        return (
          <ArticleCard 
            data={data} 
            onChange={handleSpecialTypeChange}
            errors={errors}
          />
        );
      case 'WebSite':
        return (
          <WebSiteCard
            data={data}
            onChange={handleSpecialTypeChange}
            errors={errors}
          />
        );
      default:
        return (
          Object.entries(fields).map(([fieldName, fieldConfig]) => (
            <Input
              key={fieldName}
              label={fieldConfig.label}
              type={fieldConfig.type}
              value={data[fieldName] || ''}
              error={errors[fieldName]}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              required={schemaFields[type].required.includes(fieldName)}
              options={fieldConfig.options}
            />
          ))
        );
    }
  };

  // Rest of the component remains the same
  const renderCardActions = () => (
    <div className="flex space-x-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        title={isOpen ? 'Colapsar' : 'Expandir'}
      >
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <button
        onClick={onDuplicate}
        className="p-1 text-green-500 hover:bg-green-50 rounded-full transition-colors duration-200"
        title="Duplicar"
      >
        <Copy size={20} />
      </button>
      <button
        onClick={onRemove}
        className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
        title="Eliminar"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {type}
          </h3>
          {errors && Object.keys(errors).length > 0 && (
            <span className="text-red-500 text-sm">
              (Campos requeridos faltantes)
            </span>
          )}
        </div>
        {renderCardActions()}
      </div>

      {isOpen && (
        <div className="space-y-4">
          {type === "FAQPage" ? (
            <FAQCard data={data} onChange={handleSpecialTypeChange} />
          ) : type === "BreadcrumbList" ? (
            <BreadcrumbCard data={data} onChange={handleSpecialTypeChange} />
          ) : type === "Course" ? (
            <CourseCard data={data} onChange={handleSpecialTypeChange} />
          ) : (
            Object.entries(fields).map(([fieldName, fieldConfig]) => (
              <Input
                key={fieldName}
                label={fieldConfig.label}
                type={fieldConfig.type}
                value={data[fieldName] || ""}
                error={errors[fieldName]}
                onChange={(e) => onDataChange(index, fieldName, e.target.value)}
                required={schemaFields[type].required.includes(fieldName)}
                options={fieldConfig.options}
              />
            ))
          )}
          {renderFields()}
        </div>
      )}

      {Object.keys(errors).length > 0 && isOpen && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <ul className="list-disc list-inside text-red-600 text-sm">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataCard;
