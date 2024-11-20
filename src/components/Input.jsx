import React from 'react';

export const Input = ({
  label,
  type = 'text',
  value,
  error,
  onChange,
  required,
  options,
  placeholder
}) => {
  const inputClasses = `
    w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 
    ${error ? 'border-red-500' : 'border-gray-300'}
  `;

  if (type === 'select' && options) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select 
          value={value} 
          onChange={onChange} 
          className={inputClasses}
        >
          <option value="">Seleccionar...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={value}
          onChange={onChange}
          className={`${inputClasses} min-h-[100px]`}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;