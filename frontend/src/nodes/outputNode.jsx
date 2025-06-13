// outputNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data, onDelete }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, handleIdSuffix: 'value' }
  ];

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '4px 8px',
    marginLeft: '8px',
    outline: 'none',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  return (
    <BaseNode id={id} title="Output" handles={handles} onDelete={data?.onDelete}>
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#fff' }}>Name:</span>
        <input 
          type="text" 
          value={currName} 
          onChange={e => setCurrName(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#fff' }}>Type:</span>
        <select 
          value={outputType} 
          onChange={e => setOutputType(e.target.value)}
          style={selectStyle}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
