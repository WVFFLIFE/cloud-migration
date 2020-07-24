import React from 'react';
import { makeStyles } from '@material-ui/core';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import TimeZonePicker from '../TimeZonePicker';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20
  },
  paragraph: {
    margin: 0,
    marginBottom: 20,
    fontSize: 16,
    color: '#878787'
  },
  controls: {
    width: '50%'
  },
  controlsTop: {
    display: 'flex',
    marginBottom: 20
  }
}))

const SummaryView = ({
  date,
  time,
  timezone,
  handleDate,
  handleTime,
  handleTimezone
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.paragraph}>All is ready for your migration to start. Please schedule your migration.</p>
      <div className={classes.controls}>
        <div className={classes.controlsTop}>
          <DatePicker 
            selectedDate={date}
            handleChangeDate={handleDate}
          />
          <TimePicker 
            selectedTime={time}
            handleChangeTime={handleTime}
          />
        </div>
        <div className={classes.controlsBottom}>
          <TimeZonePicker 
            value={timezone}
          />
        </div>
      </div>
    </div>
  )
}

export default SummaryView;