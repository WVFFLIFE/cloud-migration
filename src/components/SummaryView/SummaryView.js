import React from 'react';
import { makeStyles } from '@material-ui/core';
import Calendar from '../Calendar';
import TimePicker from '../TimePicker';

const useStyles = makeStyles(() => ({
  title: {
    margin: 0,
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 600,
    color: '#192B5D'
  },
  wrapper: {
    padding: 30
  },
  timePickerWrapper: {
    marginLeft: 50
  },
  content: {
    display: 'flex'
  }
}))

const SummaryView = ({
  date,
  handleChangeDate
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.title}>Date & Time to start migration</h3>
        <div className={classes.content}>
          <Calendar
            date={date}
            handleChangeDate={handleChangeDate}
          />
          <div className={classes.timePickerWrapper}>
            <TimePicker />
          </div>
        </div>
      </div>
    </>
  )
}

export default SummaryView;