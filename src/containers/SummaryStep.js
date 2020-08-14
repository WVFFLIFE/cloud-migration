import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDate,
  setCurrentTime,
  setTimeZone,
  fetchSummaryData,
  finishMigration,
  backToMapTeamsStep
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

  const handleChangeTime = (date) => {
    dispatch(setCurrentTime(date))
  }

  const handleChangeTimezone = (timezone) => {
    dispatch(setTimeZone(timezone));
  }

  const handleFinishMigration = () => {
    dispatch(finishMigration(id));
  }

  const backToPrevStep = () => {
    dispatch(backToMapTeamsStep())
  }

  return (
    <>
      <SummaryView
        date={date}
        time={time}
        currentTimezone={timezone}
        currentStatus={currentStatus}
        canEdit={canEdit}
        loading={{get: getLoading, post: postLoading}}
        handleChangeDate={handleChangeDate}
        handleChangeTime={handleChangeTime}
        handleChangeTimezone={handleChangeTimezone}
        handleFinishMigration={handleFinishMigration}
        backToPrevStep={backToPrevStep}
      />
      <Dialog 
        status={stepControlStatus}
      />
    </>
  )
}

export default SummaryStep;