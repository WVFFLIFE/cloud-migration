import React from 'react';
import {
  Button as MuiButton,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 20px',
    background: '#F3F2F1',
    borderRadius: 2,
    transition: '.2s linear',
    '&:hover': {
      background: 'rgba(0, 90, 158, .8)'
    },
    '&.Mui-disabled': {
      color: '#A19F9D',
      background: '#F3F2F1'
    }
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    fontFamily: 'Segoe UI',
    color: '#A19F9D',
    textTransform: 'capitalize'
  },
  validation: {
    background: '#005A9E',
    color: '#fff'
  },
  label: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
}))

const Button = ({
  children,
  handleClick = () => {},
  type = 'button',
  entity = 'validation',
  disabled = false
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      onClick={handleClick}
      type={type}
      classes={{
        root: classes.root,
        text: classes.text,
        label: classes.label,
      }}
      disabled={disabled}
      className={classes[entity]}
    >
      {children}
    </MuiButton>
  )
}

export default Button;