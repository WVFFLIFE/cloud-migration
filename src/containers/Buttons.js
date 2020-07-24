import React from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {userParams, useParams} from 'react-router-dom';
import {
  setCurrentStep,
  setNextStep
} from '../actions'
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 20,
    padding: '6px 30px',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Segoe UI',
    border: '1px solid transparent',
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

const Buttons = () => {
  const {id} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.stepsSettings);
  const validList = useSelector(state => state.validation);

  const handleNextStep = () => {
    dispatch(setNextStep(id, currentStep));
  }

  console.log('buttons')

  return (
    <div className={classes.root}>
      {
        !['targetenvironment', 'sourceenvironment', 'environments'].includes(currentStep) ? (
          <button
            type="button"
            className={clsx(classes.btn, classes.backBtn)}
            onClick={() => {}}
          >
            Back
          </button>
        ) : null
      }
      {
        currentStep !== 'summary' ? (
          <button
            type="button"
            className={clsx(classes.btn, classes.activeNextButton)}
            onClick={handleNextStep}
            disabled={validList[currentStep].status !== 'success'}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className={clsx(classes.btn, classes.activeNextButton)}
            onClick={() => {}}
          >
            Finish
          </button>
        )
      }
    </div>
  )
}

export default Buttons;