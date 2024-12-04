// src/components/DynamicForm.js
import React, { useState, useEffect } from 'react';
import FormField from './FormField';

const apiResponses = {
  "User Information": {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false }
    ]
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: false }
    ]
  },
  "Payment Information": {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true }
    ]
  }
};

const DynamicForm = () => {
  const [formType, setFormType] = useState('User Information');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    calculateProgress();
  };

  const calculateProgress = () => {
    const currentFields = apiResponses[formType].fields;
    let filledCount = 0;
    currentFields.forEach(field => {
      if (field.required && formData[field.name]) {
        filledCount++;
      }
    });
    setProgress((filledCount / currentFields.length) * 100);
  };

  const validateForm = () => {
    const currentFields = apiResponses[formType].fields;
    let errors = [];
    currentFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors.push(`${field.label} is required`);
      }
    });
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData([...submittedData, formData]);
      setFormData({});
      alert('Form submitted successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className="form-container">
      <h1>Dynamic Form</h1>
      <select onChange={(e) => setFormType(e.target.value)} value={formType}>
        <option value="User Information">User Information</option>
        <option value="Address Information">Address Information</option>
        <option value="Payment Information">Payment Information</option>
      </select>

      <form onSubmit={handleSubmit}>
        {apiResponses[formType].fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={errors.find(error => error.includes(field.label))}
          />
        ))}

        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="submitted-data">
        <h2>Submitted Data</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{JSON.stringify(data)}</td>
                <td>
                  <button onClick={() => alert('Edit feature coming soon')}>Edit</button>
                  <button onClick={() => {
                    const updatedData = submittedData.filter((_, i) => i !== index);
                    setSubmittedData(updatedData);
                    alert('Entry deleted successfully');
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicForm;
