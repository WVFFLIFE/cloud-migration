import {
  SET_INIT_SOURCEENVIRONMENT,
  SET_INIT_TARGETENVIRONMENT,
  SET_INIT_ENTITIES,
  SET_INIT_USERS,
  SET_INIT_BUSINESS_UNITS,
  SET_INIT_TEAMS,
  SET_INIT_SUMMARY,
  SET_ALL_VALIDATION_INIT,
} from '../constants';
import {batch} from 'react-redux';
import {setValidationInit, setCurrentStep, setStepControlStatus} from '../actions';

const setInitSourceenvironment = () => ({
  type: SET_INIT_SOURCEENVIRONMENT
})

const setInitTargetenvironment = () => ({
  type: SET_INIT_TARGETENVIRONMENT
})

const entitiesInit = () => ({
  type: SET_INIT_ENTITIES
})

const usersInit = () => ({
  type: SET_INIT_USERS
})

const businessUnitsInit = () => ({
  type: SET_INIT_BUSINESS_UNITS
})

const teamsInit = () => ({
  type: SET_INIT_TEAMS
})

const summaryInit = () => ({
  type: SET_INIT_SUMMARY
})

const allValidationInit = () => ({
  type: SET_ALL_VALIDATION_INIT
})

export const setTeamsInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(summaryInit());
      dispatch(setValidationInit('summary'))
      dispatch(teamsInit());
      dispatch(setValidationInit('map'));
      dispatch(setValidationInit('mapteams'))
      dispatch(setCurrentStep('mapteams'));
    })
  }
}

export const setBusinessUnitsInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(teamsInit());
      dispatch(setValidationInit('mapteams'))
      dispatch(businessUnitsInit());
      dispatch(setValidationInit('mapbusinessunits'))
      dispatch(setCurrentStep('mapbusinessunits'));
    })
  }
}

export const setUsersInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(businessUnitsInit());
      dispatch(setValidationInit('businessunits'))
      dispatch(usersInit());
      dispatch(setValidationInit('mapusers'))
      dispatch(setCurrentStep('mapusers'));
    })
  }
}

export const setEntitiesInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(entitiesInit());
      dispatch(setValidationInit('mapusers'))
      dispatch(setCurrentStep('mapusers'));
      dispatch(setValidationInit('entities'));
      dispatch(setCurrentStep('entities'));
    })
  }
}

export const setAllEnvironmentsInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(entitiesInit());
      dispatch(setValidationInit('entities'));
      dispatch(setInitSourceenvironment());
      dispatch(setInitTargetenvironment());
      dispatch(setValidationInit('sourceenvironment'))
      dispatch(setValidationInit('targetenvironment'))
      dispatch(setValidationInit('environments'));
      dispatch(setCurrentStep('sourceenvironment'));
    })
  }
}

export const setAllInit = () => {
  return dispatch => {
    batch(() => {
      dispatch(setAllEnvironmentsInit());
      dispatch(setEntitiesInit());
      dispatch(setUsersInit());
      dispatch(setBusinessUnitsInit());
      dispatch(setTeamsInit());
      dispatch(allValidationInit());
      dispatch(setCurrentStep('sourceenvironment'));
      dispatch(setStepControlStatus('hidden'));
    })
  }
}