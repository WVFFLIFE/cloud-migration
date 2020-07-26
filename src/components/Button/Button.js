import React from 'react';
import MuiButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 20px',
    background: '#F3F2F1',
    borderRadius: 2,
    transition: '.2s linear',
    '&.Mui-disabled': {
      color: '#A19F9D',
      background: '#F3F2F1',
      borderColor: '#f3f2f1'
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
    color: '#fff',
    '&:hover': {
      background: '#005A9E',
      color: '#fff',
      opacity: .6
    },
  },
  back: {
    paddingLeft: 30,
    paddingRight: 30,
    background: '#302846',
    color: '#fff',
    '&:hover': {
      background: '#302846',
      color: '#fff',
      opacity: .6
    },
  },
  next: {
    paddingLeft: 30,
    paddingRight: 30,
    background: '#fff',
    border: '1px solid #8A8886',
    color: '#201F1E',
    '&:hover': {
      background: '#fff',
      color: '#201F1E',
      opacity: .6
    },
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