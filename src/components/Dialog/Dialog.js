import React, { useEffect } from 'react';
import {
  makeStyles,
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  DialogContentText as MuiDialogContentText,
  DialogActions as MuiDialogActions,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    fontFamily: 'Segoe UI',
    color: '#107C10',
    textAlign: 'center'
  }
})

const Dialog = ({
  status
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(status === 'success');

  useEffect(() => {
    setOpen(status === 'success')
  }, [status])

  const handleClose = () => {
    setOpen(false);
    history.push('/migrationjob')
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
    >
      <MuiDialogTitle
        classes={{ root: classes.title }}
      >
        {"Success!"}
      </MuiDialogTitle>
      <MuiDialogContent>
        <MuiDialogContentText>
          Your migration was successfully scheduled!
        </MuiDialogContentText>
        <MuiDialogActions>
          <Button
            onClick={handleClose}
          >
            OK
          </Button>
        </MuiDialogActions>
      </MuiDialogContent>
    </MuiDialog>
  )
}

export default Dialog;