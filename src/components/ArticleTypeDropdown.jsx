import React from 'react';

const ArticleTypeDropdown = ({ value, onChange }) => {
  const articleTypes = [
    { value: "Article", label: "Article" },
    { value: "NewsArticle", label: "News Article" },
    { value: "BlogPosting", label: "Blog Posting" }
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    >
      {articleTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default ArticleTypeDropdown;