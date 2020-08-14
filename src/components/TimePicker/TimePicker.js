import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import isToday from 'date-fns/isToday'

function isTimeDisabled({h, m}) {
  const currentH = new Date().getHours();
  const currentM = new Date().getMinutes();

  return currentH >= h && currentM > m
}

const useStylesTimeItem = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: '10px 20px',
    border: '1px solid #a1adce',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color .15s linear',
    '&:last-child': {
      marginBottom: 0
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
  },
  active: {
    backgroundColor: '#192B5D',
    borderColor: '#192B5D',
    color: '#fff',
    cursor: 'default',
    '&:hover': {
      backgroundColor: '#192B5D'
    },
  },
  disabled: {
    background: 'transparent',
    borderColor: 'transparent',
    color: '#a1adce',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})

const useStyles = makeStyles({
  wrapper: {
    display: 'flex'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const TimeItem = ({
  time,
  handleChangeTime,
  active = false,
  disabled = false
}) => {
  const classes = useStylesTimeItem();
  const { h, m } = time;

  const handleClick = () => {
    handleChangeTime(time);
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.disabled]: disabled
      })}
      onClick={active || disabled ? () => {} : handleClick}
    >
      {`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`}
    </div>
  )
}

const leftTimeColumn = [
  { h: 9, m: 0 },
  { h: 10, m: 0 },
  { h: 11, m: 0 },
  { h: 12, m: 0 }
];

const rightTimeColumn = [
  { h: 13, m: 0 },
  { h: 14, m: 0 },
  { h: 15, m: 0 },
  { h: 16, m: 0 }
]

const TimePicker = ({
  date,
  currentTime,
  handleChangeTime
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn}>
        {leftTimeColumn.map(time => {
          const isActive = time.h === currentTime?.h && time.m === currentTime?.m;
          const disabled = isToday(date) && isTimeDisabled(time);
          return (
            <TimeItem
              key={time.h}
              time={time}
              handleChangeTime={handleChangeTime}
              active={isActive}
              disabled={disabled}
            />
          )
        })}
      </div>
      <div className={classes.rightColumn}>
        {rightTimeColumn.map(time => {
          const isActive = time.h === currentTime?.h && time.m === currentTime?.m;
          const disabled = isToday(date) && isTimeDisabled(time);

          return (
            <TimeItem
              key={time.h}
              time={time}
              handleChangeTime={handleChangeTime}
              active={isActive}
              disabled={disabled}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimePicker;