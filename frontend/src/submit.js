// submit.js
import { Button, Box, Dialog, DialogTitle, DialogContent, Typography, Chip, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useReactFlow } from 'reactflow';
import { useState } from 'react';

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: '10px 24px',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  },
}));

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      
      const data = await response.json();
      setResults(data);
      setOpen(true);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setResults({ error: 'Error submitting pipeline. Please try again.' });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0',
        width: '100%',
        borderRadius: '0 0 24px 24px',
        boxShadow: 'none',
        marginTop: 'auto',
        background: 'none',
      }}>
        <StyledButton 
          variant="contained" 
          size="large"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          style={{
            background: 'linear-gradient(90deg, #7B2FF2 0%, #F357A8 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px 0 rgba(123,47,242,0.15)',
          }}
        >
          Submit Pipeline
        </StyledButton>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #7B2FF2 0%, #F357A8 100%)',
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'white'
        }}>
          Pipeline Analysis Results
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {results?.error ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <ErrorIcon color="error" />
              <Typography color="error">{results.error}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {results?.is_dag ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <ErrorIcon color="error" />
                )}
                <Typography variant="h6">
                  Pipeline Status: {results?.is_dag ? 'Valid DAG' : 'Invalid DAG'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={`${results?.num_nodes || 0} Nodes`} 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
                <Chip 
                  label={`${results?.num_edges || 0} Edges`} 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
                <Chip 
                  label={results?.is_dag ? 'Valid Structure' : 'Invalid Structure'} 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};