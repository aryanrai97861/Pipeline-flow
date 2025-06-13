// BaseNode.jsx-a global node
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Handle, Position } from 'reactflow';
import { styled } from '@mui/material/styles';

const NodePaper = styled(Paper)(({ theme }) => ({
  width: 240,
  minHeight: 100,
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #7B2FF2 0%, #F357A8 100%)',
  color: '#fff',
  border: '1.5px solid #B983FF',
  borderRadius: '16px',
  boxShadow: '0 4px 24px 0 rgba(123,47,242,0.15)',
  '&:hover': {
    borderColor: '#fff',
    boxShadow: '0 0 0 2px #fff, 0 4px 24px 0 rgba(123,47,242,0.15)',
  },
}));

const StyledHandle = styled(Handle)(({ theme }) => ({
  width: 8,
  height: 8,
  backgroundColor: theme.palette.primary.main,
  border: `2px solid ${theme.palette.background.paper}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  }
}));

export const BaseNode = ({ id, title, handles = [], children, onDelete, overrideChildColor=true }) => {
  return (
    <NodePaper elevation={3} style={{ position: 'relative' }}>
      {/* X Button */}
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
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
          title="Delete node"
        >
          ×
        </button>
      )}
      {handles.map(({ type, position, handleIdSuffix, style }, index) => (
        <StyledHandle
          key={index}
          type={type}
          position={position}
          id={`${id}-${handleIdSuffix}`}
          style={style}
        />
      ))}

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="600" color="text.primary">
          {title}
        </Typography>
      </Box>

      <Box sx={{ color: 'text.secondary' ? 'text.Secondary':'inherit'}}>
        {children}
      </Box>
    </NodePaper>
  );
};
