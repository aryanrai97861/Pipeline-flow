import { useState } from 'react';
import {BaseNode} from './baseNode';

export const DropdownNode = ({ id, data, onDelete }) => {
  const [option, setOption] = useState(data?.option || 'A');

  const selectStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '4px 8px',
    marginLeft: '8px',
    outline: 'none',
    cursor: 'pointer',
    width: '120px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  return (
    <BaseNode
      id={id}
      label="Dropdown"
      sourceHandles={['selected']}
      onDelete={data?.onDelete}
    >
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#fff' }}>Pick option:</span>
        <select 
          value={option} 
          onChange={e => setOption(e.target.value)}
          style={selectStyle}
        >
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
        </select>
      </label>
    </BaseNode>
  );
};
