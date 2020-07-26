import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDate,
  setCurrentTime,
  setTimeZone,
  fetchSummaryData
} from '../actions'
import SummaryView from '../components/SummaryView';
import Dialog from '../components/Dialog';

const SummaryStep = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { date, time, timezone, getLoading, postLoading } = useSelector(state => state.summary);
  const { currentStatus, canEdit, stepControlStatus } = useSelector(state => state.stepsSettings);

  useEffect(() => {
    dispatch(fetchSummaryData(id))

    /* eslint-disable-next-line */
  }, [])

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
    <>
      <SummaryView
        currentStatus={currentStatus}
        canEdit={canEdit}
        date={date}
        time={time}
        timezone={timezone}
        getLoading={getLoading}
        postLoading={postLoading}
        handleDate={handleDate}
        handleTime={handleTime}
        handleTimezone={handleTimezone}
      />
      <Dialog 
        status={stepControlStatus}
      />
    </>
  )
}

export default SummaryStep;