import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapSelectView from '../components/MapSelectView';
import {
  setToTeamsSource,
  fetchTeams,
  clearAllTeams,
  automapTeams,
  setNextScheduleStep,
  backToMapBusinessUnitsStep
} from '../actions';

const MapTeamsStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.teams);
  const {mapteams: validationData} = useSelector(state => state.validation);
  const {stepControlStatus} = useSelector(state => state.stepsSettings);

  useEffect(() => {
    dispatch(fetchTeams(id))
    /* eslint-disable-next-line */
  }, []);

  const handleSetToSource = useCallback((id, target) => {
    dispatch(setToTeamsSource(id, target));
    /* eslint-disable-next-line */
  }, []);

  const handleClearAll = () => {
    dispatch(clearAllTeams());
  }

  const automapEntities = () => {
    dispatch(automapTeams());
  }

  const forwardToNextStep = () => {
    dispatch(setNextScheduleStep(id));
  }

  const backToPrevStep = () => {
    dispatch(backToMapBusinessUnitsStep());
  }

  const getOptionLabel = useCallback(option => option.name, [])

  return (
    <MapSelectView 
      sourceList={data.sourceTeams}
      targetList={data.targetTeams}
      handleSetToSource={handleSetToSource}
      handleClearAll={handleClearAll}
      validationData={validationData}
      loading={loading}
      automapEntities={automapEntities}
      forwardToNextStep={forwardToNextStep}
      backToPrevStep={backToPrevStep}
      getOptionLabel={getOptionLabel}
      stepControlStatus={stepControlStatus}
      type="teams"
    />
  )
}

export default MapTeamsStep;