import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  setNextStep,
  finishMigration,
  setAllEnvironmentsInit,
  setEntitiesInit,
  setUsersInit,
  setBusinessUnitsInit,
  setTeamsInit
} from '../actions'
import {makeStyles} from '@material-ui/core';
import LoaderProgress  from '../components/LoaderProgress';
import Button from '../components/Button';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    '& button': {
      marginRight: 20,
      '&:last-child': {
        marginRight: 0
      }
    }
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    padding: '6px 30px',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Segoe UI',
    border: '1px solid transparent',
    borderRadius: 2,
    cursor: 'pointer',
    '&:disabled': {
      background: '#F3F2F1',
      color: '#A19F9D',
      border: '1px solid transparent',
      cursor: 'default'
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  activeNextButton: {
    background: '#fff',
    border: '1px solid #8A8886',
    borderRadius: 2,
    color: '#201F1E'
  },
  backBtn: {
    background: '#302846',
    color: '#fff'
  }
}))

function getBackStepFunction(step) {
  switch(step) {
    case 'entities':
      return setAllEnvironmentsInit
    case 'mapusers':
      return setEntitiesInit
    case 'mapbusinessunits':
      return setUsersInit
    case 'mapteams':
      return setBusinessUnitsInit
    case 'summary':
      return setTeamsInit
    default:
      return () => {}
  }
}

function checkIsValid(validationList, step) {
  if (!step) return false;

  return [
    'sourceenvironment',
    'targetenvironment',
    'environments'
  ].includes(step) ? validationList['environments'].status === 'success' 
  : validationList[step].status === 'success';
}

const Buttons = () => {
  const {id} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentStep, currentStatus, stepControlStatus } = useSelector(state => state.stepsSettings);
  const validList = useSelector(state => state.validation);
  const backFn = getBackStepFunction(currentStep);

  const handleNextStep = () => {
    dispatch(setNextStep(id, currentStep));
  }

  const handleFinish = () => {
    dispatch(finishMigration(id))
  }

  const handleStepBack = () => {
    dispatch(backFn());
  }

  const isBackButtonVisible = currentStatus === 'Draft';
  const isStepValid = checkIsValid(validList, currentStep);

  return (
    <div className={classes.root}>
      {
        !['targetenvironment', 'sourceenvironment', 'environments'].includes(currentStep) && isBackButtonVisible ? (
          <Button
            type="button"
            entity="back"
            handleClick={handleStepBack}
            disabled={(stepControlStatus !== 'hidden') || (currentStep ? validList[currentStep].status === 'loading' : false)}
          >
            Back
          </Button>
        ) : null
      }
      {
        currentStep !== 'summary' ? (
          <Button
            handleClick={handleNextStep}
            disabled={!isStepValid}
            entity="next"
          >
            Next
            {stepControlStatus !== 'hidden' ? (
              <LoaderProgress
                status={stepControlStatus}
              />
            ) : null}
          </Button>
        ) : (
          <Button
            handleClick={handleFinish}
            entity="next"
            disabled={currentStep ? validList[currentStep].status === 'loading' : false}
          >
            Finish
            {stepControlStatus !== 'hidden' ? (
              <LoaderProgress
                status={stepControlStatus}
              />
            ) : null}
          </Button>
        )
      }
    </div>
  )
}

export default Buttons;