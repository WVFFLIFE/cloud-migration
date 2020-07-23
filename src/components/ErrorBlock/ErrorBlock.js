import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  leftWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    fontSize: '1.15rem',
    color: '#D83B01'
  },
  text: {
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
    color: '#D83B01'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    maxWidth: 20,
    width: 20,
    minHeight: 51,
    background: 'rgba(250, 65, 0, 0.2)',
    borderRadius: 0
  },
  chevron: {
    fontSize: '1.3rem',
    color: '#D83B01'
  }
}))

const ErrorBlock = ({
  handleClick
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftWrapper}>
        <ReportProblemOutlinedIcon className={classes.icon} />
        <span className={classes.text}>Failed</span>
      </div>
      <Button 
        onClick={handleClick}
        classes={{
          root: classes.button
        }}
      >
        <ChevronLeftOutlinedIcon className={classes.chevron} />
      </Button>
    </div>
  )
}

export default ErrorBlock;