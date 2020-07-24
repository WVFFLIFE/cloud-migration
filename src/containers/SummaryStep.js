import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDate,
  setCurrentTime,
  setTimeZone,
  finishMigration
} from '../actions'
import SummaryView from '../components/SummaryView';

const SummaryStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { date, time, timezone, loading } = useSelector(state => state.summary);

  const handleDate = (date) => {
    dispatch(setCurrentDate(date))
  }

  const handleTime = (date) => {
    dispatch(setCurrentTime(date))
  }

  const handleTimezone = (timezone) => {
    dispatch(setTimeZone(timezone));
  }

  // const handleFinishMigration = () => {
  //   dispatch(
  //     finishMigration(id, )
  //   )
  // }

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