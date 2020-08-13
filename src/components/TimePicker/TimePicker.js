import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStylesTimeItem = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    padding: 10,
    border: '1px solid #a1adce',
    borderRadius: 6,
    '&:last-child': {
      marginBottom: 0
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
    marginRight: 30
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const TimeItem = ({
  time,
  handleClick,
  active = false,
  disable = false
}) => {
  const classes = useStylesTimeItem();
  const { h, s } = time;
  return (
    <div
      className={classes.root}
      onClick={handleClick}
    >
      {`${String(h).padStart(2, '0')}:${String(s).padStart(2, '0')}`}
    </div>
  )
}

const leftTimeColumn = [
  { h: 9, s: 0 },
  { h: 10, s: 0 },
  { h: 11, s: 0 },
  { h: 12, s: 0 }
];

const rightTimeColumn = [
  { h: 13, s: 0 },
  { h: 14, s: 0 },
  { h: 15, s: 0 },
  { h: 16, s: 0 }
]

const TimePicker = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn}>
        {leftTimeColumn.map(time => {
          return (
            <TimeItem
              key={time.h}
              time={time}
            />
          )
        })}
      </div>
      <div className={classes.rightColumn}>
        {rightTimeColumn.map(time => {
          return (
            <TimeItem
              key={time.h}
              time={time}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimePicker;