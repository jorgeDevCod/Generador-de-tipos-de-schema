import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./Input";
import { schemaFields } from "../utils/schemaFields";
import FAQCard from "./FAQCard";
import BreadcrumbCard from "./BreadcrumbCard";
import CourseCard from "./CourseCard";
import CardJSONOutput from "./CardJSONOutput";

const DataCard = ({
  index,
  type,
  data,
  errors,
  onDataChange,
  onRemove,
  onDuplicate,
  articleType = "Article",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const fields = schemaFields[type]?.fields || {};

  const handleSpecialTypeChange = (newData) => {
    if (type === "FAQPage") {
      onDataChange(index, "mainEntity", newData.mainEntity);
    } else if (type === "BreadcrumbList") {
      onDataChange(index, "itemListElement", newData.itemListElement);
    } else if (type === "Course") {
      Object.keys(newData).forEach((key) => {
        onDataChange(index, key, newData[key]);
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{type}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          <button
            onClick={onDuplicate}
            className="text-green-500 hover:text-green-600"
          >
            Duplicar
          </button>
          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-600"
          >
            Eliminar
          </button>
        </div>
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

          <CardJSONOutput type={type} data={data} articleType={articleType} />
        </div>
      )}
    </div>
  );
};

export default DataCard;
