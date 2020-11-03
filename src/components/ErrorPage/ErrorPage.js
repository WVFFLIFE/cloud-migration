import React from 'react';
import {makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import Button from '../Button';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 520
  },
  box: {
    padding: 20
  },
  leftBox: {
    borderRight: '2px solid #192B5D'
  },
  rightBox: {
    textAlign: 'center'
  },
  errorNum: {
    fontSize: 72,
    color: '#192B5D',
    textTransform: 'uppercase'
  },
  paragraph: {
    marginBottom: 25,
    fontSize: 16,
    color: '#192B5D'
  },
  button: {
    marginRight: 0,
    background: 'transparent',
    border: '1px solid #192B5D',
    color: '#192B5D',
    textTransform: 'capitalize'
  }
})

const ErrorPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = () => {
    history.push(`/`)
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={clsx(classes.box, classes.leftBox)}>
          <span className={classes.errorNum}>404</span>
        </div>
        <div className={clsx(classes.box, classes.rightBox)}>
          <p className={classes.paragraph}>The resource was not found</p>
          <Button
            entity="back"
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;
