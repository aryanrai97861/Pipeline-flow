import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const SearchBox = ({ id, data}) => {
  const handles = [
    { type: 'source', position: Position.Right, handleIdSuffix: 'value' }
  ];

  return (
    <BaseNode
      id={id}
      title={data?.label || 'Search'}
      handles={handles}
      onDelete={data?.onDelete}
      overrideChildColor={false}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 40 }}>
        <input
          placeholder="Type to search..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #B983FF',
            background: 'rgba(0,0,0,0.15)',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>
    </BaseNode>
  );
};