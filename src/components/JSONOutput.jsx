import React from 'react';

const JSONOutput = ({ card, articleType = 'Article' }) => {
  const generateJSONLD = () => {
    const jsonLD = {
      "@context": "https://schema.org",
      "@type": card.type === 'Article' ? articleType : card.type,
      ...card.data
    };
    return JSON.stringify(jsonLD, null, 2);
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">Output JSON-LD:</h3>
      <pre className="bg-gray-100 p-4 rounded-md">
        <script type="application/ld+json">
          {generateJSONLD()}
        </script>
      </pre>
    </div>
  );
};

export default JSONOutput;