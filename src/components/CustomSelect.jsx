import React, { useState, useRef, useEffect } from 'react';

export const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={selectRef} className="relative w-full">
      <div 
        onClick={toggleDropdown} 
        className="w-full border rounded-md p-2 cursor-pointer flex justify-between items-center"
      >
        {React.Children.map(children, child => 
          React.cloneElement(child, { 
            isOpen, 
            value, 
            onValueChange: (newValue) => {
              onValueChange(newValue);
              setIsOpen(false);
            } 
          })
        )}
      </div>
    </div>
  );
};

export const SelectTrigger = ({ children, value, placeholder }) => (
  <div className="flex-1">
    {value ? children : <span className="text-gray-500">{placeholder}</span>}
  </div>
);

export const SelectValue = ({ children }) => children;

export const SelectContent = ({ children, isOpen, value, onValueChange }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-10 w-full border rounded-md shadow-lg bg-white mt-1">
      <div className="max-h-60 overflow-auto">
        {React.Children.map(children, child => 
          React.cloneElement(child, { 
            isSelected: child.props.value === value,
            onSelect: () => onValueChange(child.props.value)
          })
        )}
      </div>
    </div>
  );
};

export const SelectItem = ({ children, value, isSelected, onSelect }) => (
  <div 
    onClick={onSelect}
    className={`
      p-2 cursor-pointer hover:bg-gray-100 
      ${isSelected ? 'bg-blue-100' : ''}
    `}
  >
    {children}
  </div>
);