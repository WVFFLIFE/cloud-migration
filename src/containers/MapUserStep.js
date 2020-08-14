import React, {useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import MapSelectView from '../components/MapSelectView';
import {
  fetchUsers,
  setToSource,
  clearAllUsers,
  automapUser,
  setNextMapBusinessUnitsStep,
  backToEntitiesStep
} from '../actions';

const MapUserStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {data, loading} = useSelector(state => state.users);
  const {mapusers: validationData} = useSelector(state => state.validation);
  const {stepControlStatus} = useSelector(state => state.stepsSettings);

  useEffect(() => {
    dispatch(fetchUsers(id))
    /* eslint-disable-next-line */
  }, []);

  const handleSetToSource = useCallback((sourceIndex, target) => {
    dispatch(setToSource(sourceIndex, target))
    /* eslint-disable-next-line */
  }, [])

  const handleClearAll = () => {
    dispatch(clearAllUsers());
  }

  const automapEntities = () => {
    dispatch(automapUser());
  }

  const forwardToNextStep = () => {
    dispatch(setNextMapBusinessUnitsStep(id))
  }

  const backToPrevStep = () => {
    dispatch(backToEntitiesStep());
  }

  const getOptionLabel = useCallback(option => option.fullName, [])

  return (
    <MapSelectView 
      sourceList={data.sourceUsers}
      targetList={data.targetUsers}
      handleSetToSource={handleSetToSource}
      handleClearAll={handleClearAll}
      validationData={validationData}
      loading={loading}
      automapEntities={automapEntities}
      forwardToNextStep={forwardToNextStep}
      backToPrevStep={backToPrevStep}
      getOptionLabel={getOptionLabel}
      stepControlStatus={stepControlStatus}
      type="users"
    />
  )
}

export default MapUserStep;