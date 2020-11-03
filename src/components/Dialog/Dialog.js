import React, { useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
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
    history.push('/')
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
