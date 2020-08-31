import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { SkypeIcon } from '../Icons';

const getCircleClasses = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 32,
    marginRight: 12,
    background: '#F1F2F6',
    zIndex: 99
  },
  wrapperSmall: {
    width: 21,
    height: 25,
    marginRight: 30,
    marginLeft: 3,
    opacity: 0
  },
  wrapperSmallActive: {
    opacity: 1
  },
  wrapperSmallValid: {
    opacity: 1
  },
  big: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    fontSize: 14,
    lineHeight: '24px',
    fontFamily: 'Segoe UI',
    fontWeight: 700,
    background: 'transparent',
    border: '2px solid #A1ADCE',
    borderRadius: '50%',
    color: '#A1ADCE'
  },
  bigActive: {
    background: 'transparent',
    borderColor: '#192B5D',
    color: '#192B5D'
  },
  small: {
    position: "relative",
    display: 'block',
    width: 18,
    height: 18,
    borderRadius: '50%',
  },
  smallActive: {
    border: '1px solid #E05D2A',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 9,
      height: 9,
      background: '#E05D2A',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  smallValid: {
    borderColor: 'transparent',
    background: '#192B5D',
    '&::before': {
      display: 'none'
    }
  },
  checkIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
  },
  checkIconBig: {
    fontSize: '1.1rem'
  },
  checkIconSmall: {
    fontSize: '0.8rem'
  },
  bigValid: {
    borderColor: '#192B5D',
    background: '#192B5D'
  }
}))

const getSidebarClasses = makeStyles(() => ({
  ul: {
    width: '100%',
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  rootUl: {
    position: 'relative',
    padding: 0,
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 13,
      width: 2,
      height: '100%',
      background: '#A1ADCE'
    }
  },
  li: {
    marginBottom: 15,
    '&:last-child': {
      marginBottom: 0
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25
  },
  label: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 700,
    color: '#A1ADCE'
  },
  labelActive: {
    color: '#192B5D'
  },
  labelValid: {
    color: '#192B5D'
  },
  sidebarTitle: {
    margin: 0,
    marginBottom: 25,
    padding: 0,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '21px',
    color: '#192B5D',
    textTransform: 'uppercase'
  },
  skypeBlock: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 16,
    background: '#E5E8F1',
    borderRadius: 8
  },
  skypeIcon: {
    marginRight: 8
  },
  skypeText: {
    display: 'block',
    marginRight: 8,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    color: "#192B5D"
  },
  skypeLink: {
    fontSize: 15,
    lineHeight: '24px',
    fontWeight: 600,
    color: '#F26026'
  }
}))

const getSubstepClasses = makeStyles(() => ({
  envName: {
    display: 'block',
    marginTop: 10,
    fontSize: 14,
    color: '#192B5D'
  },
  li: {
    display: 'flex',
    marginBottom: 30
  },
  label: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    color: '#C4C4C4'
  },
  labelActive: {
    color: '#F26026'
  },
  labelValid: {
    color: '#192B5D'
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
}))

function Circle({
  text = null,
  size = 'small',
  active = false,
  valid = false
}) {
  const classes = getCircleClasses();
  const activeType = size === 'small' ? 'smallActive' : 'bigActive';
  const validType = size === 'small' ? 'smallValid' : 'bigValid';
  const checkIconSizeClass = size === 'small' ? classes.checkIconSmall : classes.checkIconBig;
  const isValidIsNotActive = valid && !active;

  return (
    <span className={clsx(classes.wrapper, {
      [classes.wrapperSmall]: size === 'small',
      [classes.wrapperSmallValid]: isValidIsNotActive,
      [classes.wrapperSmallActive]: active,
    })}>
      <span
        className={clsx(classes[size], {
          [classes[activeType]]: active,
          [classes[validType]]: isValidIsNotActive
        })}
      >
        {isValidIsNotActive ? <CheckIcon className={clsx(classes.checkIcon, checkIconSizeClass)} /> : text}
      </span>
    </span>
  )
}

function buildSubsteps(substeps, config) {
  const classes = getSubstepClasses();
  return substeps.map(id => {
    const currentStep = config[id];

    const isValidIsNotActive = currentStep.isValid && !currentStep.isActive;

    return (
      <li key={id} className={classes.li}>
        <Circle
          active={currentStep.isActive}
          valid={currentStep.isValid}
          hidden
        />
        <div>
          <span className={clsx(classes.label, {
            [classes.labelValid]: isValidIsNotActive,
            [classes.labelActive]: currentStep.isActive,
          })}>{currentStep.label}</span>
          {currentStep?.data?.environmentName ? <span className={clsx(classes.envName, {
            [classes.labelActive]: currentStep.isActive
          })}>{currentStep.data.environmentName}</span> : null}
        </div>

      </li>
    )
  })
}

const SideBar = ({
  stepsConfig
}) => {
  const classes = getSidebarClasses();

  return (
    <>
      <h2 className={classes.sidebarTitle}>Migration to cloud</h2>
      <ul className={clsx(classes.ul, classes.rootUl)}>
        {Object.keys(stepsConfig)
          .filter(step => stepsConfig[step].parent)
          .map((step, idx) => {
            const currentStepData = stepsConfig[step];

            return (
              <li key={currentStepData.label} className={classes.li}>
                <div className={classes.flex}>
                  <Circle
                    size="big"
                    text={idx + 1}
                    active={currentStepData.isActive}
                    valid={currentStepData.isValid}
                  />
                  <span className={clsx(classes.label, {
                    [classes.labelActive]: currentStepData.isActive,
                    [classes.labelValid]: currentStepData.isValid
                  })}>{currentStepData.label}</span>
                </div>
                {'substeps' in currentStepData && currentStepData.substeps.length ? (
                  <ul className={classes.ul}>
                    {buildSubsteps(currentStepData.substeps, stepsConfig)}
                  </ul>
                ) : null}
              </li>
            )
          })
        }
      </ul>
      <div className={classes.skypeBlock}>
        <SkypeIcon className={classes.skypeIcon} />
        <span className={classes.skypeText}>Need help?</span>
        <a href="skype:live:uds_ddt?chat" className={classes.skypeLink}>helptomigrate</a>
      </div>
    </>
  )
}

export default React.memo(SideBar);