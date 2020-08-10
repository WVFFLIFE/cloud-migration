import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MuiCheckbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  icon: {
    position: 'relative',
    width: 16,
    height: 16,
    border: '1px solid #586B9D',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  checkedIcon: {
    background: '#192B5D',
    borderColor: '#192B5D'
  },
  checkIcon: {
    position: 'absolute',
    top: -1,
    left: -1,
    fontSize: '1rem',
    color: '#fff'
  }
}))

const Checkbox = ({
  isItemSelected,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiCheckbox
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}><CheckIcon className={classes.checkIcon}/></span>}
      icon={<span className={classes.icon}></span>}
      checked={isItemSelected}
      color="default"
      {...rest}
    />
  )
}

export default React.memo(Checkbox);