import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEntities,
  validateEntities,
  setValidationInit,
  setSelectedEntities,
  setInitSelectedEntities,
  setCurrentTab,
  setCurrentStep,
  backToTargetEnvironmentStep
} from '../actions';
import EntitiesStepView from '../components/EntitiesStepView';
import Tabs from '../components/Tabs';

const EntitiesStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    data,
    selectedEntities,
    currentTab,
  } = useSelector(state => state.entities);
  const { entities: validationData } = useSelector(state => state.validation);

  console.log(selectedEntities, currentTab);

  useEffect(() => {
    dispatch(fetchEntities(id))
    /* eslint-disable-next-line */
  }, [])

  const handleValidate = useCallback((list, flag) => {
    dispatch(validateEntities(id, list, flag))

    /* eslint-disable-next-line */
  }, []);

  const setInitialStepValidation = useCallback(() => {
    dispatch(setValidationInit('entities'));
    /* eslint-disable-next-line */
  }, [])

  const handleChangeSelectedEntities = useCallback((entity) => {
    dispatch(setSelectedEntities(entity));
    /* eslint-disable-next-line */
  }, [])

  const handleInitSelectedEntities = useCallback(() => {
    dispatch(setInitSelectedEntities())
    /* eslint-disable-next-line */
  }, []);

  const handleChangeCurrentTab = useCallback((newTab) => {
    dispatch(setCurrentTab(newTab));
    /* eslint-disable-next-line */
  }, [])

  const forwardToNextStep = () => {
    dispatch(setCurrentStep('mapusers'))
  }

  const backToPrevStep = () => {
    dispatch(backToTargetEnvironmentStep());
  }

  const filteredData = data.filter(item => item.category === currentTab);
  const isSelectedSmth = Object.keys(selectedEntities)
    .some(key => selectedEntities[key].length > 0);

  return (
    <>
      <Tabs
        data={data}
        selectedEntities={selectedEntities}
        currentTab={currentTab}
        handleChangeTab={handleChangeCurrentTab}
      />
      <EntitiesStepView
        loading={loading}
        data={filteredData}
        currentTab={currentTab}
        selectedEntities={selectedEntities[currentTab]}
        canValidate={isSelectedSmth}
        handleValidate={handleValidate}
        validationData={validationData}
        setInitialStepValidation={setInitialStepValidation}
        handleChangeSelectedEntities={handleChangeSelectedEntities}
        handleInitSelectedEntities={handleInitSelectedEntities}
        forwardToNextStep={forwardToNextStep}
        backToPrevStep={backToPrevStep}
      />
    </>
  )
}

export default EntitiesStep;