import {BaseNode} from './baseNode';

export const InfoNode = ({ id, data, onDelete }) => {
  return (
    <BaseNode
      id={id}
      label="Info"
      onDelete={data?.onDelete}
    >
      <div>{data?.message || 'This is an informational node.'}</div>
    </BaseNode>
  );
};
