import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStylesTimeItem = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
  }
})

const useStyles = makeStyles({
  wrapper: {
    display: 'flex'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 30
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
        [classes.active]: active
      })}
      onClick={active ? () => {} : handleClick}
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
  currentTime,
  handleChangeTime
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn}>
        {leftTimeColumn.map(time => {
          const isActive = time.h === currentTime.h && time.m === currentTime.m;

          return (
            <TimeItem
              key={time.h}
              time={time}
              handleChangeTime={handleChangeTime}
              active={isActive}
            />
          )
        })}
      </div>
      <div className={classes.rightColumn}>
        {rightTimeColumn.map(time => {
          const isActive = time.h === currentTime.h && time.m === currentTime.m;

          return (
            <TimeItem
              key={time.h}
              time={time}
              handleChangeTime={handleChangeTime}
              active={isActive}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimePicker;