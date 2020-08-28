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

export const setValidationSuccess = (step, message = '', other = {}) => {
  return {
    type: SET_VALIDATION_SUCCESS,
    payload: {
      step,
      message,
      other
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
      .post(`/${id}/${stepPoint}`, data)
      .then(res => {
          const {message, ...rest} = res.data;
          batch(() => {
            dispatch(setValidationSuccess(step, message, rest));
            if (step === 'targetenvironment') {
              dispatch(setValidationSuccess('environments'))
            }
          })
      })
      .catch(err => {
        const {data} = err.response;
        dispatch(setValidationError(step, data.message))
      })
  }
}