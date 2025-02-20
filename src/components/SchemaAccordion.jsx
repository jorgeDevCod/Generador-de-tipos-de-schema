import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SchemaAccordion = ({ schemaType, children, onClear, generateJSONLD }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedArticleType, setSelectedArticleType] = useState("Article");

  const exportSchema = () => {
    const jsonLD = generateJSONLD();
    const blob = new Blob([jsonLD], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${schemaType}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderArticleTypeSelector = () => {
    if (schemaType !== "Article") return null;

    const articleTypes = [
      { value: "Article", label: "Article" },
      { value: "NewsArticle", label: "News Article" },
      { value: "BlogPosting", label: "Blog Posting" },
    ];

    return (
      <select
        value={selectedArticleType}
        onChange={(e) => setSelectedArticleType(e.target.value)}
        className="ml-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {articleTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    );
  };

  // Modificar los children para pasar el articleType
  const childrenWithArticleType = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { articleType: selectedArticleType });
    }
    return child;
  });

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
          {renderArticleTypeSelector()}
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

      {isOpen && <div className="p-4 bg-white">{childrenWithArticleType}</div>}
    </div>
  );
};

export default SchemaAccordion;
