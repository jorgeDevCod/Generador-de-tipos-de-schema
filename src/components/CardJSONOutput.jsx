import React from "react";

const CardJSONOutput = ({ type, data, articleType }) => {
  const generateCardJSON = () => {
    const baseStructure = {
      "@context": "https://schema.org",
      "@type": type === "Article" ? articleType : type,
      ...data,
    };

    // Agregar las etiquetas de script y formatear el JSON
    return `<script type="application/ld+json">\n${JSON.stringify(baseStructure, null, 2)}\n</script>`;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-2">Schema JSON-LD:</h4>
      <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono">
        <code>{generateCardJSON()}</code>
      </pre>
    </div>
  );
};

export default CardJSONOutput;
