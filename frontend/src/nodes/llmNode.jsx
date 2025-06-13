// llmNode.js
import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id,data, onDelete }) => {
  const handles = [
    { type: 'target', position: Position.Left, handleIdSuffix: 'system', style: { top: '33%' } },
    { type: 'target', position: Position.Left, handleIdSuffix: 'prompt', style: { top: '66%' } },
    { type: 'source', position: Position.Right, handleIdSuffix: 'response' }
  ];

  return (
    <BaseNode id={id} title="LLM" handles={handles} onDelete={data?.onDelete}>
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
