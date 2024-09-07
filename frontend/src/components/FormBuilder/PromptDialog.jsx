import React from 'react';
import { Button, Dialog, DialogActions, CircularProgress, DialogContent, DialogTitle, TextField } from '@mui/material';

const PromptDialog = (props) => {
  const handleClose = () => {
    props.setPrompt('');
    props.setOpen(false);
  };

  const handleCreate = () => {
    props.setSubmit(true);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Enter your prompt here :</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="prompt"
            label="Prompt"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={props.prompt}
            onChange={(e) => props.setPrompt(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={props.loading} color="primary" variant="contained">
            {props.loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PromptDialog;
