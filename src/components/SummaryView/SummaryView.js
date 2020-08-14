import React, { useCallback } from 'react';
import { listTimeZones } from 'timezone-support';
import format from 'date-fns/format';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Calendar from '../Calendar';
import TimePicker from '../TimePicker';
import VirtualList from '../VirtualList';
import Button from '../Button';
import Loader from '../Loader';

const useStyles = makeStyles(() => ({
  rootLoading: {
    textAlign: 'center'
  },
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
    marginLeft: '14%'
  },
  content: {
    display: 'flex',
    marginBottom: 30
  },
  dateViewText: {
    margin: 0,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: '42px',
    color: '#192B5D',
  },
  timeZoneLabel: {
    display: 'block',
    margin: 0,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: '20px',
    color: '#192B5D'
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 30,
    borderTop: '1px solid #A1ADCE'
  }
}));

const timeZones = listTimeZones();

const SummaryView = ({
  date,
  time,
  currentTimezone,
  loading,
  currentStatus,
  handleChangeDate,
  handleChangeTime,
  handleChangeTimezone,
  handleFinishMigration,
  backToPrevStep
}) => {
  const classes = useStyles();
  const dateView = format(new Date(date), 'EEEE, MMMM dd');
  const getOptionLabel = useCallback(option => option, []);

  return (
    <div className={clsx({
      [classes.rootLoading]: loading.get
    })}>
      {loading.get ? <Loader /> : (
        <>
          <div className={classes.wrapper}>
            <h3 className={classes.title}>Date & Time to start migration</h3>
            <div className={classes.content}>
              <Calendar
                date={date}
                handleChangeDate={handleChangeDate}
              />
              <div className={classes.timePickerWrapper}>
                <p className={classes.dateViewText}>{dateView}</p>
                <TimePicker
                  date={date}
                  currentTime={time}
                  handleChangeTime={handleChangeTime}
                />
              </div>
            </div>
            <div>
              <label className={classes.timeZoneLabel}>Your timezone</label>
              <VirtualList
                options={timeZones}
                getOptionLabel={getOptionLabel}
                value={currentTimezone}
                handleChangeValue={handleChangeTimezone}
              />
            </div>
          </div>
          <div className={classes.buttonsWrapper}>
            {currentStatus !== 'Scheduled' ? <Button
              disabled={loading.get}
              entity="back"
              label="Back"
              onClick={backToPrevStep}
            /> : null}
            <Button
              disabled={loading.get || !date || !time || loading.post}
              entity="finish"
              label="Finish"
              onClick={handleFinishMigration}
              loading={loading.post}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SummaryView;