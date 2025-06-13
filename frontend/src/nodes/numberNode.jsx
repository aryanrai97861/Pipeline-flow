import { useState } from 'react';
import {BaseNode} from './baseNode';

export const NumberNode = ({ id, data, onDelete }) => {
  const [number, setNumber] = useState(data?.number ?? '');

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '4px 8px',
    marginLeft: '8px',
    outline: 'none',
    width: '100px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value === '' ? '' : Number(value));
  };

  return (
    <BaseNode
      id={id}
      label="Number"
      sourceHandles={['value']}
      onDelete={data?.onDelete}
    >
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#fff' }}>Number:</span>
        <input
          type="number"
          value={number}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
    </BaseNode>
  );
};
