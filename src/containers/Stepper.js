import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { stepsConfig } from '../config'
import { initStepSettings, setAllInit } from '../actions'
import {
  Grid,
  makeStyles
} from '@material-ui/core'
import { 
  EnvironmentStep,
  EntitiesStep,
  MapUserStep,
  Buttons,
  MapBusinessUnitsStep,
  MapTeamsStep,
  SummaryStep
} from '../containers'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader'

function getCurrentStepView(step) {
  switch(step) {
    case 'environments':
      return <EnvironmentStep />
    case 'sourceenvironment':
      return <EnvironmentStep />
    case 'targetenvironment':
      return <EnvironmentStep />
    case 'entities':
      return <EntitiesStep />
    case 'mapusers':
      return <MapUserStep />
    case 'mapbusinessunits':
      return <MapBusinessUnitsStep />
    case 'mapteams':
      return <MapTeamsStep />
    case 'summary':
      return <SummaryStep />
    default:
      return <div></div>
  }
}

function getStepTitleData(step) {
  switch (step) {
    case 'sourceenvironment':
      return {
        title: 'Environments connection',
        number: 1
      }
    case 'targetenvironment':
      return {
        title: 'Environments connection',
        number: 1
      }
    case 'entities':
      return {
        title: 'Entities for migration',
        number: 2
      }
    case 'mapusers':
      return {
        title: 'Mapping',
        number: 3
      }
    case 'mapbusinessunits':
      return {
        title: 'Mapping',
        number: 3
      }
    case 'mapteams':
      return {
        title: 'Mapping',
        number: 3
      }
    case 'summary':
      return {
        title: 'Summary',
        number: 4
      }
    default:
      return {
        title: 'Environments connection',
        number: 1
      }
  }
}

const useStyles = makeStyles({
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: loading => loading ? 400 : '100%',
    background: '#fff',
    border: '0.5px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 2
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: loading => loading ? 'center' : 'normal',
    justifyContent: loading => loading ? 'center' : 'flex-start',
    minHeight: loading => loading ? 400 : '100%',
    background: '#fff',
    border: '0.5px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.15)'
  },
  topBar: {
    padding: 20,
    borderBottom: '0.5px solid rgba(0, 0, 0, 0.2)',
  },
  wrapper: {
    width: '100%'
  },
  h2: {
    margin: 0,
    fontSize: 24,
    fontFamily: 'Segoe UI',
    fontWeight: 350,
    color: '#302846'
  }
})

const Stepper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentStep,
    loading: stepLoading
  } = useSelector(state => state.stepsSettings)
  const stepsList = useSelector(state => state.validation)
  const classes = useStyles(stepLoading);

  useEffect(() => {
    dispatch(initStepSettings(id))

    return () => {
      dispatch(setAllInit());
    }
    /* eslint-disable-next-line */
  }, [id]);

  const validStepConfig = {};

  Object.keys(stepsConfig)
    .forEach(key => {
      validStepConfig[key] = {
        ...stepsConfig[key],
        isValid: stepsList[key].status === 'success',
        isActive: currentStep === key
      }
    })

    if (
      [
        'environments',
        'sourceenvironment',
        'targetenvironment'
      ].includes(currentStep)
    ) {
      validStepConfig['environments'].isActive = true;
    } else if (
      [
        'map',
        'mapusers',
        'mapbusinessunits',
        'mapteams'
      ].includes(currentStep)
    ) {
      validStepConfig['map'].isActive = true;
    }

  const { title, number } = getStepTitleData(currentStep)

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
    >
      <Grid
        item
        md={3}
        xs={12}
      >
        <div className={classes.leftSide}>
          {stepLoading ? <Loader /> : (
            <SideBar
              stepsConfig={validStepConfig}
            />
          )}
        </div>
      </Grid>
      <Grid
        item
        md={9}
        xs={12}
      >
        <div className={classes.rightSide}>
          {!stepLoading
            ? (
              <div className={classes.topBar}>
                <h2 className={classes.h2}>{number}. {title}</h2>
              </div>
            )
            : null
          }
          {
            stepLoading 
              ? <Loader /> 
              : getCurrentStepView(currentStep)
          }
        </div>
        {stepLoading ? null : <Buttons />}
      </Grid>
    </Grid>
  )
}

export default Stepper