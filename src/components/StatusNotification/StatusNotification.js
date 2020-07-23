import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import {
  Warning as WarningIcon,
  Close as CloseIcon,
  CheckCircleOutlineOutlined as CheckIcon
} from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: '6px 12px',
    background: 'rgba(250, 65, 0, 0.2)'
  },
  icon: {
    marginRight: 15,
    fontSize: '1rem',
  },
  iconError: {
    color: '#D83B01'
  },
  iconSuccess: {
    color: '#107C10'
  },
  message: {
    fontSize: 12,
    fontFamily: 'Segoe UI',
    color: '#201F1E'
  },
  error: {
    background: 'rgba(250, 65, 0, 0.2)'
  },
  success: {
    background: 'rgba(95, 210, 85, 0.2)'
  },
  closeIcon: {
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#201F1E'
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    minWidth: 'auto',
    padding: 3,
    borderRadius: '50%'
  }
}))

const StatusNotification = ({
  status,
  message,
  handleCloseClick
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.success]: status === 'success',
        [classes.error]: status === 'error'
      })}
    >
      <div className={classes.textWrapper}>
        {status === 'success' ? (
          <CheckIcon className={clsx(classes.icon, classes.iconSuccess)} />
        ) : (
            <WarningIcon
              className={clsx(classes.icon, classes.iconError)}
            />
          )}
        <span className={classes.message}>{message}</span>
      </div>
      <Button
        classes={{
          root: classes.iconButton
        }}
        onClick={handleCloseClick}
      >
        <CloseIcon
          className={classes.closeIcon}
        />
      </Button>

    </div>
  )
}

export default StatusNotification;