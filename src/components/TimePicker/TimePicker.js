import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  KeyboardTimePicker
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  calendarIcon: {
    fontSize: '1.2rem',
    color: '#605E5C'
  },
  button: {
    padding: 3
  },
  input: {
    padding: '8px 15px',
    fontSize: 14,
    color: '#302846'
  },
  outlined: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    transform: 'translate(14px, 9px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.8)'
    }
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)'
  }
}));

const TimePicker = ({
  selectedTime,
  handleChangeTime,
  disabled
}) => {
  const classes = useStyles();

  return (
    <KeyboardTimePicker
      disabled={disabled}
      className={classes.root}
      keyboardIcon={
        <ScheduleIcon 
          className={classes.calendarIcon}
        />
      }
      InputLabelProps={{
        classes: {
          outlined: classes.outlined
        }
      }}
      InputProps={{
        classes: {
          input: classes.input,
          disabled: classes.disabled
        }
      }}
      inputVariant="outlined"
      KeyboardButtonProps={{
        classes: {
          root: classes.button
        }
      }}
      ampm={false}
      value={selectedTime}
      onChange={handleChangeTime}
      minutesStep={1}
      label="Time"
    />
  )
}

export default TimePicker;