// src/components/FormField.js
import React from 'react';

const FormField = ({ field, value, onChange, error }) => {
  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div className="form-field">
      <label>{field.label}</label>
      {field.type === 'dropdown' ? (
        <select name={field.name} onChange={handleChange} value={value}>
          {field.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={handleChange}
        />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default FormField;
