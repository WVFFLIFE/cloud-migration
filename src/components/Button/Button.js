import React from 'react';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import LoaderProgress from '../LoaderProgress';

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
  finish: {
    background: '#F26026',
    border: '1px solid #F26026',
    color: '#fff',
    '&:hover': {
      background: 'rgba(242, 96, 38, .7)',
      borderColor: 'rgba(242, 96, 38, .7)'
    },
    '&.Mui-disabled': {
      color: '#fff',
      borderColor: 'transparent',
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
    color: '#192B5D',
    '&.Mui-disabled': {
      color: '#fff',
      border: '1px solid transparent',
    }
  },
  label: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 700,
    textTransform: 'capitalize'
  },
  chevron: {
    marginTop: 3,
    fontSize: '1.3rem'
  },
  chevronFinish: {
    color: '#fff'
  }
}))

const Button = ({
  children,
  label,
  type = 'button',
  entity = 'validation',
  disabled = false,
  loading = false,
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
      {entity === 'back' ? <ChevronLeftIcon className={clsx(classes.chevron)} /> : null}
      {children || label}
      {['next', 'finish'].includes(entity) ? (
        <ChevronRightIcon className={clsx(classes.chevron, {
          [classes.chevronFinish]: entity === 'finish'
        })} />
      ) : null}
      {loading ? (
        <LoaderProgress status="loading"/>
      ) : null}
    </MuiButton>
  )
}

export default React.memo(Button);