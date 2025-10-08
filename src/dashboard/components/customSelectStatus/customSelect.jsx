import React from 'react';
import './customSelect.css'; // We'll create this CSS file

const CustomSelectStatus = ({ value, onChange  }) => {

   
 const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Canceled', label: 'Cancel' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Shipped', label: 'Shipped' }
  ];

 
  return (
    <select 
      className="custom-select"
      value={value} 
      onChange={onChange}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelectStatus;