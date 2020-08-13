import React from 'react';
import MuiButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: 6,
    cursor: 'pointer',
    '&.Mui-disabled': {
      color: '#fff',
      background: '#DFE3EB'
    }
  },
  validation: {
    background: '#192B5D',
    color: '#fff'
  },
  next: {
    background: '#fff',
    border: '1px solid #F26026',
    color: '#F26026',
    '&.Mui-disabled': {
      color: '#fff',
      border: '1px solid transparent',
    }
  },
  back: {
    marginRight: 25,
    background: '#fff',
    border: '1px solid #F26026',
    color: '#F26026',
    '&.Mui-disabled': {
      color: '#fff',
      border: '1px solid transparent',
    }
  },
  clear: {
    background: '#fff',
    border: '1px solid #192B5D',
    color: '#192B5D'
  },
  label: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontWeight: 700,
    textTransform: 'capitalize'
  },
  chevron: {
    marginTop: 3,
    fontSize: '1.3rem'
  }
}))

const Button = ({
  children,
  label,
  type = 'button',
  entity = 'validation',
  disabled = false,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      type={type}
      classes={{
        root: clsx(classes.root, classes[entity]),
        text: classes.text,
        label: clsx(classes.label),
      }}
      disabled={disabled}
      {...rest}
    >
      {entity === 'back' ? <ChevronLeftIcon className={clsx(classes.chevron)}/> : null}
      {children || label}
      {entity === 'next' ? <ChevronRightIcon className={clsx(classes.chevron)}/> : null}
    </MuiButton>
  )
}

export default Button;