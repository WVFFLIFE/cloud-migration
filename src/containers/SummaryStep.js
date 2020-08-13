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

  const handleChangeDate = (date) => {
    dispatch(setCurrentDate(date))
  }

  const handleTime = (date) => {
    console.log(date);
    dispatch(setCurrentTime(date))
  }

  const handleTimezone = (timezone) => {
    dispatch(setTimeZone(timezone));
  }

  return (
    <>
      <SummaryView
        date={date}
        handleChangeDate={handleChangeDate}
      />
      <Dialog 
        status={stepControlStatus}
      />
    </>
  )
}

export default SummaryStep;