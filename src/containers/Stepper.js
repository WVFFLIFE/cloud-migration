import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { stepsConfig } from '../config'
import { initStepSettings, setAllInit } from '../actions'
import {
  makeStyles
} from '@material-ui/core'
import {
  SourceEnvironmentStep,
  TargetEnvironmentStep,
  EntitiesStep,
  MapUserStep,
  MapBusinessUnitsStep,
  MapTeamsStep,
  SummaryStep,
} from '../containers'
import StatusNotification from '../components/StatusNotification'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader'

function getCurrentStepView(step) {
  switch (step) {
    case 'sourceenvironment':
      return <SourceEnvironmentStep />
    case 'targetenvironment':
      return <TargetEnvironmentStep />
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

function getStepTitle(step) {
  switch (step) {
    case 'sourceenvironment':
      return 'Environments connection > Source environment'
    case 'targetenvironment':
      return 'Environments connection > Target environment'
    case 'entities':
      return 'Entities for migration'
    case 'mapusers':
      return 'Map > Users'
    case 'mapbusinessunits':
      return 'Map > Business units'
    case 'mapteams':
      return 'Map Teams'
    case 'summary':
      return 'Schedule'
    default:
      return 'Environments connection > Source environment'
  }
}

const useStyles = makeStyles({
  leftSide: {
    minHeight: loading => loading ? 400 : '100%',
    padding: 25,
    background: '#F1F2F6',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: loading => loading ? 'center' : 'normal',
    justifyContent: loading => loading ? 'center' : 'flex-start',
    minHeight: loading => loading ? 400 : '100%',
    padding: 25,
    background: '#F8F9FB',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1
  },
  h2: {
    margin: 0,
    marginBottom: 25,
    fontSize: 26,
    fontFamily: 'Segoe UI',
    fontWeight: 700,
    color: '#192B5D'
  },
  stepRoot: {
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 16.6px 29.6px 0 rgba(161,173,206,0.12)',
  },
  wrapperLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const Stepper = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    currentStep,
    loading: stepLoading
  } = useSelector(state => state.stepsSettings)
  const stepsList = useSelector(state => state.validation)
  const classes = useStyles(stepLoading);

  console.log(stepsList, stepsConfig);

  const errorCallback = () => history.push('/404');

  useEffect(() => {
    dispatch(initStepSettings(id, errorCallback))

    return () => {
      dispatch(setAllInit());
    }
    /* eslint-disable-next-line */
  }, [id]);

  const validStepConfig = Object.keys(stepsConfig)
    .reduce((acc, next) => {
      const item = stepsConfig[next];
      const validationItem = stepsList[next];

      acc[next] = {
        ...item,
        isActive: currentStep === next || item?.substeps?.includes(currentStep),
        isValid: validationItem.status === 'success',
        data: { ...validationItem }
      }

      return acc;
    }, {});

  const title = getStepTitle(currentStep);

  return (
    <div className={clsx(classes.wrapper, {
      [classes.wrapperLoading]: stepLoading
    })}>
      {stepLoading ? <Loader /> : (
        <>
          <div className="col-3">
            <div className={classes.leftSide}>
              <SideBar
                currentStep={currentStep}
                stepsConfig={validStepConfig}
              />
            </div>
          </div>
          <div className="col-9">
            <div className={classes.rightSide}>
              {['error', 'success'].includes(stepsList[currentStep].status) && stepsList[currentStep].message ? (
                <StatusNotification
                  status={stepsList[currentStep].status}
                  message={stepsList[currentStep].message}
                  currentStep={currentStep}
                />
              ) : null}
              <div>
                <h2 className={classes.h2}>{title}</h2>
              </div>
              <div className={classes.stepRoot}>
                {getCurrentStepView(currentStep)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Stepper