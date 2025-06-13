import { useState } from 'react';
import {BaseNode} from './baseNode';

export const SwitchNode = ({ id, data, onDelete }) => {
  const [on, setOn] = useState(data?.on || false);

  return (
    <BaseNode
      id={id}
      label="Switch"
      sourceHandles={['on', 'off']}
      onDelete={data?.onDelete}
    >
      <label>
        <input
          type="checkbox"
          checked={on}
          onChange={e => setOn(e.target.checked)}
        />
        Switch is {on ? 'ON' : 'OFF'}
      </label>
    </BaseNode>
  );
};
