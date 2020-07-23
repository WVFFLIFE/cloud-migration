import {
  SET_VALIDATION_INIT,
  SET_VALIDATION_START,
  SET_VALIDATION_SUCCESS,
  SET_VALIDATION_ERROR
} from '../constants';
import {batch} from 'react-redux';
import { setCurrentStep } from './stepsSettingsAction';
import MigrationService from '../services/migration.services';
import {getNextStep} from '../helpers';

function getStepPoint(step) {
  switch(step) {
    case 'sourceenvironment':
      return 'source-environment'
    case 'targetenvironment':
      return 'target-environment'
    default:
      return step
  }
}

export const setValidationStart = (step) => ({
  type: SET_VALIDATION_START,
  payload: { step }
})

export const setValidationSuccess = (step, message = '') => ({
  type: SET_VALIDATION_SUCCESS,
  payload: {
    step,
    message
  }
})

export const setValidationError = (step, message) => ({
  type: SET_VALIDATION_ERROR,
  payload: {
    step,
    message
  }
})

export const setValidationInit = (step) => ({
  type: SET_VALIDATION_INIT,
  payload: { step }
})

export const validateStep = (id, step, data) => {
  return dispatch => {
    dispatch(setValidationStart(step));

    const stepPoint = getStepPoint(step);

    MigrationService
      .validate(`/migration-job/${id}/${stepPoint}`, data)
      .then(({ status, message }) => {
        if (status === 'success') {
          dispatch(setValidationSuccess(step, message))

          setTimeout(() => {
            batch(() => {
              const newStep = getNextStep(step);
              dispatch(setCurrentStep(newStep));

              if (newStep === 'environments') {
                dispatch(setValidationSuccess(newStep, ''))
              }
            })
          }, 900)
        } else if (status === 'error') {
          dispatch(setValidationError(step, message))
        }
      })
  }
}