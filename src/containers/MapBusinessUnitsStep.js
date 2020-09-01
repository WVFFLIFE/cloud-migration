import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapSelectView from '../components/MapSelectView';
import {
  fetchBusinessUnits,
  setToBusinessUnitsSource,
  automapBusinessUnits,
  clearAllBusiniessUnits,
  setNextMapTeamsStep,
  backToMapUsersStep
} from '../actions';

const MapBusinessUnitsStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.businessunits);
  const {mapbusinessunits: validationData} = useSelector(state => state.validation);
  const {stepControlStatus} = useSelector(state => state.stepsSettings);

  useEffect(() => {
    dispatch(fetchBusinessUnits(id))
    /* eslint-disable-next-line */
  }, []);

  const handleSetToSource = useCallback((id, target) => {
    dispatch(setToBusinessUnitsSource(id, target));
    /* eslint-disable-next-line */
  }, []);

  const handleClearAll = () => {
    dispatch(clearAllBusiniessUnits());
  }

  const automapEntities = () => {
    dispatch(automapBusinessUnits());
  }

  const forwardToNextStep = () => {
    dispatch(setNextMapTeamsStep(id));
  }

  const backToPrevStep = () => {
    dispatch(backToMapUsersStep());
  }

  const getOptionLabel = useCallback(option => option.name, [])

  return (
    <MapSelectView
      sourceList={data.sourceBusinessUnits}
      targetList={data.targetBusinessUnits}
      handleSetToSource={handleSetToSource}
      handleClearAll={handleClearAll}
      validationData={validationData}
      loading={loading}
      automapEntities={automapEntities}
      forwardToNextStep={forwardToNextStep}
      backToPrevStep={backToPrevStep}
      getOptionLabel={getOptionLabel}
      stepControlStatus={stepControlStatus}
      type="businessunits"
    />
  )
}

export default MapBusinessUnitsStep;