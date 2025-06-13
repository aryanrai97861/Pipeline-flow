// draggableNode.js
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const NodePaper = styled(Paper)(({ theme }) => ({
  cursor: 'grab',
  minWidth: '140px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #7B2FF2 0%, #F357A8 100%)',
  color: '#fff',
  border: '1.5px solid #B983FF',
  borderRadius: '16px',
  boxShadow: '0 4px 24px 0 rgba(123,47,242,0.15)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: '#fff',
    boxShadow: '0 0 0 2px #fff, 0 4px 24px 0 rgba(123,47,242,0.15)',
  },
}));

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <NodePaper
      elevation={2}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <Typography variant="button" sx={{ color: 'common.white' }}>
        {label}
      </Typography>
    </NodePaper>
  );
};
