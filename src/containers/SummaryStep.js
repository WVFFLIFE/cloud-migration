import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {format} from 'date-fns';
import { parseFromTimeZone } from 'date-fns-timezone';
import {
  setCurrentDate,
  setCurrentTime,
  setTimeZone,
} from '../actions'
import SummaryView from '../components/SummaryView';

function getScheduledDate(date, time, timezone) {
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  
  const h = time.getHours();
  const m = time.getMinutes();

  const scheduledDate = new Date();
  
  scheduledDate.setDate(dd);
  scheduledDate.setMonth(mm);
  scheduledDate.setFullYear(yyyy);

  const textDate = format(
    scheduledDate,
    'yyyy/MM/dd'
  );

  const utcDate = parseFromTimeZone(`${textDate} ${h}:${m}:0.000`, timezone);

  return format(
    utcDate,
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  )
}

const SummaryStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { date, time, timezone, loading } = useSelector(state => state.summary);
  const scheduledDate = getScheduledDate(date, time, timezone)

  const handleDate = (date) => {
    dispatch(setCurrentDate(date))
  }

  const handleTime = (date) => {
    dispatch(setCurrentTime(date))
  }

  const handleTimezone = (timezone) => {
    dispatch(setTimeZone(timezone));
  }

  return (
    <SummaryView 
      date={date}
      time={time}
      timezone={timezone}
      loading={loading}
      handleDate={handleDate}
      handleTime={handleTime}
      handleTimezone={handleTimezone}
    />
  )
}

export default SummaryStep;