import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSourceEnvironmentData, 
  fetchSourceEnvironmentData,
  validateStep,
  setValidationInit
} from '../actions';
import EnvironmentStepView from '../components/EnvironmentStepView';

const SourceEnvironmentStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {currentStep} = useSelector(state => state.stepsSettings);
  const { data, loading } = useSelector(state => state.sourceEnvironment);
  const { sourceenvironment: validationData } = useSelector(state => state.validation);

  useEffect(() => {
    if (currentStep === 'sourceenvironment') {
      dispatch(fetchSourceEnvironmentData(id));
    }
    /* eslint-disable-next-line */
  }, [id]);

  const handleFieldChange = (event) => {
    event.persist();
    const fieldData = { [event.target.name]: event.target.value }

    dispatch(setSourceEnvironmentData(fieldData))
  }

  const validate = (e) => {
    e.preventDefault();

    dispatch(validateStep(id, 'sourceenvironment', data));
  }
  
  const handleCloseError = () => {
    dispatch(setValidationInit('sourceenvironment'));
  }

  return (
    <EnvironmentStepView 
      title="Source Environment"
      handleFieldChange={handleFieldChange}
      data={data}
      loading={loading}
      isActive={currentStep === 'sourceenvironment'}
      validationData={validationData}
      validate={validate}
      handleCloseError={handleCloseError}
    />
  )
}

export default SourceEnvironmentStep;