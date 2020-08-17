import {
  SET_VALIDATION_INIT,
  SET_VALIDATION_START,
  SET_VALIDATION_SUCCESS,
  SET_VALIDATION_ERROR
} from '../constants';
import MigrationService from '../services/migration.services';
import { batch } from 'react-redux';

function getStepPoint(step) {
  switch (step) {
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

export const setValidationSuccess = (step, message = '', data = {}) => {
  return {
    type: SET_VALIDATION_SUCCESS,
    payload: {
      step,
      message,
      data
    }
  }
}

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
      .then(({ status, message, ...data }) => {
        if (status === 'success') {
          batch(() => {
            dispatch(setValidationSuccess(step, message, data));
            if (step === 'targetenvironment') {
              dispatch(setValidationSuccess('environments'))
            }
          })
        } else if (status === 'error') {
          dispatch(setValidationError(step, message))
        }
      })
  }
}