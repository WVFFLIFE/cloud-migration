import React from 'react';
import { makeStyles } from '@material-ui/core';
import { WarningIcon, SkypeIcon } from '../Icons';
import {
  CheckCircleOutlineOutlined as CheckIcon
} from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    padding: 20,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 9.6px 18.6px 0 rgba(161,173,206,0.12)'
  },
  icon: {
    marginRight: 15,
    fontSize: '1.3rem',
  },
  iconError: {
    fontSize: 24,
    color: '#C4001A'
  },
  iconSuccess: {
    color: '#192B5D'
  },
  message: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#201F1E'
  },
  errorMessage: {
    color: '#C4001A'
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
  skypeContactWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  skypeText: {
    margin: 0,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '21px',
    color: '#192B5D'
  },
  skypeIcon: {
    marginRight: 8
  },
  skypeLink: {
    fontSize: 16,
    lineHeight: '24px',
    color: '#F26026'
  }
}))

const StatusNotification = ({
  status,
  message,
}) => {
  const classes = useStyles();

  const isSuccess = status === 'success';
  const isError = !isSuccess;

  return (
    <div
      className={classes.root}
    >
      <div className={classes.textWrapper}>
        {isSuccess ? (
          <CheckIcon className={clsx(classes.icon, classes.iconSuccess)} />
        ) : (
            <WarningIcon
              className={clsx(classes.icon, classes.iconError)}
            />
          )}
        <span className={clsx(classes.message, {
          [classes.errorMessage]: isError
        })}>{message}</span>
      </div>
      {status === 'error' ? (
        <div className={classes.skypeContactWrapper}>
          <p className={classes.skypeText}>Contact us via skype</p>
          <SkypeIcon color="#F26026" className={classes.skypeIcon}/>
          <a href="skype:" className={classes.skypeLink}>helptomigrate_skype</a>
        </div>
      ) : null}
    </div>
  )
}

export default StatusNotification;