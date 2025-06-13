// textNode.js
import React, { useState, useEffect, useRef } from 'react';
import { Position, Handle, useReactFlow } from 'reactflow';
import { TextareaAutosize } from '@mui/material';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([
    { type: 'source', position: Position.Right, handleIdSuffix: 'output', style: { top: '50%' } }
  ]);
  const [nodeDimensions, setNodeDimensions] = useState({ width: 240, height: 120 });
  const [previousVariables, setPreviousVariables] = useState([]);
  const textareaRef = useRef(null);
  const [showDelete, setShowDelete] = useState(false);
  
  // Use React Flow's hook to access deletion methods and edges
  const { deleteElements, getEdges } = useReactFlow();

  // Extract valid JS variable names in double curly brackets
  const extractVariables = (text) => {
    // More strict regex that requires complete {{ }} pairs
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [];
    let match;
    
    // Reset regex lastIndex to ensure we start from beginning
    regex.lastIndex = 0;
    
    while ((match = regex.exec(text)) !== null) {
      const variableName = match[1].trim();
      // Only add if variable name is valid and not empty
      if (variableName && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variableName)) {
        matches.push(variableName);
      }
    }
    
    // Return unique variables only
    return [...new Set(matches)];
  };

  // Calculate node dimensions based on content
  const calculateDimensions = (text) => {
    const lines = text.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const charWidth = 8.5;
    const padding = 48;
    const calculatedWidth = Math.max(240, (maxLineLength * charWidth) + padding);
    const lineHeight = 22;
    const baseHeight = 80;
    const calculatedHeight = Math.max(120, baseHeight + (lines.length * lineHeight));
    return {
      width: Math.min(calculatedWidth, 600),
      height: Math.min(calculatedHeight, 500)
    };
  };

  useEffect(() => {
    const variables = extractVariables(currText);
    const newDimensions = calculateDimensions(currText);
    setNodeDimensions(newDimensions);
    
    // Find removed variables (more robust comparison)
    const removedVariables = previousVariables.filter(prevVar => 
      prevVar && !variables.includes(prevVar)
    );
    
    // Remove edges connected to removed variable handles
    if (removedVariables.length > 0) {
      const currentEdges = getEdges();
      const edgesToRemove = currentEdges.filter(edge => 
        edge.target === id && edge.targetHandle && removedVariables.includes(edge.targetHandle)
      );
      
      if (edgesToRemove.length > 0) {
        deleteElements({ edges: edgesToRemove });
      }
    }
    
    // Update previous variables for next comparison
    setPreviousVariables([...variables]);
    
    const newHandles = [
      { type: 'source', position: Position.Right, handleIdSuffix: 'output', style: { top: '50%' } }
    ];
    
    if (variables.length > 0) {
      // Improved handle positioning calculation
      const availableHeight = newDimensions.height - 100; // Account for padding
      const handleSpacing = variables.length === 1 ? 0 : availableHeight / (variables.length - 1);
      const startTop = 50; // Start from center if only one, otherwise from top
      
      variables.forEach((variable, index) => {
        let topPosition;
        if (variables.length === 1) {
          topPosition = '50%';
        } else {
          const calculatedTop = startTop + (index * handleSpacing);
          topPosition = `${Math.max(30, Math.min(calculatedTop, newDimensions.height - 30))}px`;
        }
        
        newHandles.push({
          type: 'target',
          position: Position.Left,
          handleIdSuffix: variable,
          style: { top: topPosition }
        });
      });
    }
    setHandles(newHandles);
  }, [currText, id, deleteElements, getEdges]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // delete handler using React Flow's deleteElements
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div
      style={{
        width: `${nodeDimensions.width}px`,
        height: `${nodeDimensions.height}px`,
        minHeight: '120px',
        background: 'linear-gradient(135deg, #7B2FF2 0%, #F357A8 100%)',
        color: '#fff',
        border: '1.5px solid #B983FF',
        borderRadius: '16px',
        boxShadow: '0 4px 24px 0 rgba(123,47,242,0.15)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s, height 0.2s',
      }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* Delete Button (top-right) */}
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 16,
          zIndex: 20,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
        title="Delete node"
      >
        ×
      </button>
      
      {/* Title Section */}
      <div
        style={{
          padding: '16px 16px 8px',
          fontWeight: '600',
          fontSize: '14px',
          color: '#fff'
        }}
      >
        Text
      </div>
      
      {/* Content Section */}
      <div
        style={{
          flex: 1,
          padding: '0 16px 16px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextareaAutosize
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          minRows={3}
          maxRows={15}
          placeholder="Enter text with variables like {{variableName}}"
          style={{
            width: '100%',
            flex: 1,
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: '14px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: '#ffffff',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      
      {/* Render Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.handleIdSuffix || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.handleIdSuffix || `handle-${index}`}
          style={{
            width: '12px',
            height: '12px',
            border: '2px solid #fff',
            backgroundColor: handle.type === 'source' ? '#F357A8' : '#4CAF50',
            borderRadius: '50%',
            cursor: 'crosshair',
            ...handle.style
          }}
        />
      ))}
    </div>
  );
};