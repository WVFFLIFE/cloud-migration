import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button
} from '@material-ui/core';

const useStyles = makeStyles({

})

const ConfirmationDialog = ({
  open,
  handleClose,
  handleSuccess
}) => {
  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Confirm job deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete the job?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Reject
          </Button>
        <Button onClick={handleSuccess} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;