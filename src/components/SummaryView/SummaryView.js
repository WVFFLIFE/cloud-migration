import React from 'react';
import { makeStyles } from '@material-ui/core';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import TimeZonePicker from '../TimeZonePicker';
import Loader from '../Loader';

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
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const SummaryView = ({
  currentStatus,
  canEdit,
  date,
  time,
  timezone,
  handleDate,
  handleTime,
  handleTimezone,
  getLoading,
  postLoading
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.paragraph}>All is ready for your migration to start. Please schedule your migration.</p>
      {getLoading ? (
        <div className={classes.loadingWrapper}>
          <Loader />
        </div>
      ) : (
          <div className={classes.controls}>
            <div className={classes.controlsTop}>
              <DatePicker
                disabled={!canEdit}
                selectedDate={date}
                handleChangeDate={handleDate}
              />
              <TimePicker
                disabled={!canEdit}
                selectedTime={time}
                handleChangeTime={handleTime}
              />
            </div>
            <div className={classes.controlsBottom}>
              <TimeZonePicker
                disabled={!(['Draft', 'Scheduled'].includes(currentStatus) && canEdit)}
                value={timezone}
                handleChangeValue={handleTimezone}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default SummaryView;