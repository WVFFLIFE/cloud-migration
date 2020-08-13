import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { 
  setTargetEnvironmentData, 
  fetchTargetEnvironmentData,
  validateStep,
  setValidationInit,
  setCurrentStep,
  backToSourceEnvrionmentStep,
  setIsBack
} from '../actions';
import EnvironmentStepView from '../components/EnvironmentStepView';

const TargetEnvironmentStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {currentStep} = useSelector(state => state.stepsSettings);
  const { data, loading } = useSelector(state => state.targetEnvironment);
  const { targetenvironment: validationData } = useSelector(state => state.validation);

  useEffect(() => {
    if (currentStep === 'targetenvironment') {
      dispatch(fetchTargetEnvironmentData(id));
    }
    /* eslint-disable-next-line */
  }, [id, currentStep]);

  const handleFieldChange = useCallback((event) => {
    event.persist();
    const fieldData = { [event.target.name]: event.target.value }

    dispatch(setTargetEnvironmentData(fieldData))

    /* eslint-disable-next-line */
  }, [])

  const validate = (e) => {
    e.preventDefault();

    dispatch(validateStep(id, 'targetenvironment', data))
  }

  const handleCloseError = () => {
    dispatch(setValidationInit('targetenvironment'));
  }

  const forwardToNextStep = () => {
    batch(() => {
      dispatch(setIsBack(false));
      dispatch(setCurrentStep('entities'));
    })
  }

  const backToPrevStep = () => {
    dispatch(backToSourceEnvrionmentStep());
  }

  return (
    <EnvironmentStepView 
      title="Target Environment"
      handleFieldChange={handleFieldChange}
      data={data}
      loading={loading}
      isActive={currentStep === 'targetenvironment'}
      validationData={validationData}
      validate={validate}
      handleCloseError={handleCloseError}
      forwardToNextStep={forwardToNextStep}
      backToPrevStep={backToPrevStep}
    />
  )
}

export default TargetEnvironmentStep;