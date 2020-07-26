import React from 'react';
import {makeStyles} from '@material-ui/core';
import {
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  root: {
    marginRight: 20,
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
})

const DatePicker = ({
  selectedDate,
  handleChangeDate,
  disabled
}) => {
  const classes = useStyles();

  return (
    <KeyboardDatePicker
      className={classes.root}
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
      keyboardIcon={
        <DateRangeIcon className={classes.calendarIcon}/>
      }
      variant="inline"
      format="dd/MM/yyyy"
      label="Date"
      value={selectedDate}
      onChange={handleChangeDate}
      disabled={disabled}
    />
  )
}

export default DatePicker;