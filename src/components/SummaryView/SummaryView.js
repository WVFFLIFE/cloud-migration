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
    marginBottom: 15
  }
}))

const SummaryView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.paragraph}>All is ready for your migration to start. Please schedule your migration.</p>
      <div className={classes.controls}>
        <div className={classes.controlsTop}>
          <DatePicker 
            selectedDate={new Date()}
            handleChangeDate={() => {}}
          />
          <TimePicker 
            selectedTime={new Date()}
            handleChangeTime={() => {}}
          />
        </div>
        <div className={classes.controlsBottom}>
          <TimeZonePicker />
        </div>
      </div>
    </div>
  )
}

export default SummaryView;