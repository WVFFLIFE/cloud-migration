import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import {
  format,
  getDaysInMonth,
  getMonth,
  getDate,
  addMonths,
  subMonths,
  isAfter,
  isSameDay,
  isWeekend
} from 'date-fns/esm';
import clsx from 'clsx';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const DAYS_IN_WEEK = 7

// Make a new Date pointing to the same time as `date`
function cloneDate(date) {
  return new Date(date.getTime())
}

function getDays(date) {
  let daysInMonth = getDaysInMonth(date)
  let days = []
  for (let index = 1; index <= daysInMonth; index++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), index))
  }
  return days
}

function getWeeks(date, { firstDayOfWeek = 1, forceSixRows = false } = {}) {
  let days = getDays(date)
  let daysInMonth = days.length
  let week = []
  let weeks = []

  // build weeks array
  days.forEach(day => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      weeks.push(week)
      week = []
    }
    week.push(day)
    if (days.indexOf(day) === days.length - 1) {
      weeks.push(week)
    }
  })

  const firstWeek = weeks[0]
  for (let index = DAYS_IN_WEEK - firstWeek.length; index > 0; index--) {
    const outsideDate = cloneDate(firstWeek[0])
    outsideDate.setDate(firstWeek[0].getDate() - 1)
    firstWeek.unshift(outsideDate)
    daysInMonth++
  }

  const lastWeek = weeks[weeks.length - 1]
  for (let index = lastWeek.length; index < DAYS_IN_WEEK; index++) {
    const outsideDate = cloneDate(lastWeek[lastWeek.length - 1])
    outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1)
    lastWeek.push(outsideDate)
    daysInMonth++
  }

  if (forceSixRows && daysInMonth < 42) {
    let lastDayOfMonth = weeks[weeks.length - 1][6]
    let lastWeek = []
    let index = 1
    while (daysInMonth < 42) {
      let lastDayOfMonthClone = cloneDate(lastDayOfMonth)
      let day = new Date(
        lastDayOfMonthClone.setDate(lastDayOfMonthClone.getDate() + index),
      )
      if (lastWeek.length > 0 && day.getDay() === firstDayOfWeek) {
        weeks.push(lastWeek)
        lastWeek = []
      }
      lastWeek.push(day)
      daysInMonth++
      index++
    }
    weeks.push(lastWeek)
  }

  return weeks
}

const weekShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const useStyles = makeStyles({
  calendar: {
    display: 'inline-flex',
    flexDirection: 'column'
  },
  weekTitlesWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    marginRight: 20,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color .15s linear',
    '&:last-child': {
      marginRight: 0
    },
    '&:hover': {
      backgroundColor: '#F3F4F7'
    }
  },
  disabledBlock: {
    cursor: 'default',
    '&:hover': {
      background: 'transparent'
    }
  },
  activeBlock: {
    background: '#192b5d',
    '&:hover': {
      background: '#192b5d',
      cursor: 'default'
    }
  },
  weekTitle: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '20px',
    color: '#a1adce',
    textTransform: 'uppercase',
  },
  week: {
    display: 'flex',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0
    }
  },
  day: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#192b5d'
  },
  disabledDay: {
    color: '#a1adce'
  },
  activeDay: {
    color: '#fff'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  textButton: {
    padding: 0
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    minWidth: 'auto',
    borderRadius: 6
  },
  buttonsWrapper: {
    display: 'flex'
  },
  arrowIcon: {
    fontSize: '1.3rem',
    color: '#192b5d'
  },
  currentMonth: {
    margin: 0,
    fontSize: 16,
    lineHeight: '20px',
    color: '#192B5D'
  }
})

const Calendar = ({
  date,
  handleChangeDate
}) => {
  const classes = useStyles();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const weeks = getWeeks(currentMonth);

  const setNextMonth = () => {
    const newDate = addMonths(cloneDate(currentMonth), 1);
    setCurrentMonth(newDate);
  }

  const setPrevMonth = () => {
    const newDate = subMonths(cloneDate(currentMonth), 1);
    setCurrentMonth(newDate);
  }
  

  const currentMonthView = format(currentMonth, 'MMMM yyyy');
  const shouldShowPrevButton = isAfter(currentMonth, new Date());

  return (
    <div className={classes.calendar}>
      <div className={classes.controls}>
        <p className={classes.currentMonth}>{currentMonthView}</p>
        <div className={classes.buttonsWrapper}>
          {shouldShowPrevButton ? (
            <Button
              classes={{
                text: classes.textButton,
                root: classes.buttonRoot
              }}
              onClick={setPrevMonth}
            >
              <NavigateBeforeIcon className={classes.arrowIcon} />
            </Button>
          ) : null}
          
          <Button
            classes={{
              text: classes.textButton,
              root: classes.buttonRoot
            }}
            onClick={setNextMonth}
          >
            <NavigateNextIcon className={classes.arrowIcon} />
          </Button>
        </div>
      </div>
      <div>
        <div className={classes.weekTitlesWrapper}>
          {weekShort.map(item => {
            return (
              <div className={classes.block} key={item}>
                <span className={classes.weekTitle}>{item}</span>
              </div>
            )
          })}
        </div>
        <div className={classes.dateWrapper}>
          {
            weeks.map((week, index) => {
              return (
                <div className={classes.week} key={index}>
                  {week.map(day => {
                    const currentDay = new Date(day);
                    const isCurrentMonth = getMonth(currentMonth) === getMonth(day);
                    const isDayActive = isSameDay(date, currentDay);
                    const isDayAvailable = isAfter(currentDay, new Date()) || isSameDay(currentDay, new Date());
                    const isWeekendDay = isWeekend(currentDay);
                    const disabledDay = !isCurrentMonth || !isDayAvailable || isWeekendDay;

                    return (
                      <div
                        key={day}
                        onClick={disabledDay ? () => {} : () => handleChangeDate(currentDay)}
                        className={clsx(classes.block, {
                          [classes.disabledBlock]: disabledDay,
                          [classes.activeBlock]: isDayActive
                        })}
                      >
                        <span className={clsx(classes.day, {
                          [classes.disabledDay]: disabledDay,
                          [classes.activeDay]: isDayActive
                        })}>{getDate(day)}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default React.memo(Calendar);