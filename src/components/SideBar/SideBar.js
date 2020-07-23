import React from 'react';
import clsx from 'clsx';
import { makeStyles, Collapse } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const getCircleClasses = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    marginRight: 10
  },
  big: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontSize: 18,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    background: '#fff',
    border: '1px solid #828282',
    borderRadius: '50%',
    color: '#828282'
  },
  bigActive: {
    background: '#0078D4',
    borderColor: '#0078D4',
    color: '#fff'
  },
  small: {
    display: 'block',
    width: 10,
    height: 10,
    border: '1px solid #C4C4C4',
    borderRadius: '50%'
  },
  smallActive: {
    borderColor: '#0078D4'
  },
  smallValid: {
    background: '#0078D4'
  },
  checkIcon: {
    color: '#fff',
  },
  bigValid: {
    borderColor: '#107C10',
    background: '#107C10'
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
    padding: 20,
  },
  li: {
    marginBottom: 15,
    '&:last-child': {
      marginBottom: 0
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    fontSize: 18,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#878787'
  },
  labelActive: {
    color: '#0078D4'
  },
  labelValid: {
    color: '#107C10'
  }
}))

const getSubstepClasses = makeStyles(() => ({
  li: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    color: '#C4C4C4'
  },
  labelActive: {
    color: '#0078D4'
  },
  labelValid: {
    color: '#0078D4'
  }
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

  return (
    <span className={classes.wrapper}>
      <span
        className={clsx(classes[size], {
          [classes[activeType]]: active,
          [classes[validType]]: valid
        })}
      >
        {valid ? <CheckIcon className={classes.checkIcon} /> : text}
      </span>
    </span>
  )
}

function buildSubsteps(substeps, config) {
  const classes = getSubstepClasses();
  return substeps.map(id => {
    const currentStep = config[id];

    return (
      <li key={id} className={classes.li}>
        <Circle
          active={currentStep.isActive}
          valid={currentStep.isValid}
        />
        <span className={clsx(classes.label, {
          [classes.labelActive]: currentStep.isActive,
          [classes.labelValid]: currentStep.isValid
        })}>{currentStep.label}</span>
      </li>
    )
  })
}

const SideBar = ({
  stepsConfig
}) => {
  const classes = getSidebarClasses();

  return (
    <ul className={clsx(classes.ul, classes.rootUl)}>
      {Object.keys(stepsConfig)
        .filter(step => stepsConfig[step].parent)
        .map((step, idx) => {
          const currentStep = stepsConfig[step];

          return (
            <li key={currentStep.label} className={classes.li}>
              <div className={classes.flex}>
                <Circle
                  size="big"
                  text={idx + 1}
                  active={currentStep.isActive}
                  valid={currentStep.isValid}
                />
                <span className={clsx(classes.label, {
                  [classes.labelActive]: currentStep.isActive,
                  [classes.labelValid]: currentStep.isValid
                })}>{currentStep.label}</span>
              </div>
              <Collapse in={!currentStep.isValid}>
                {'substeps' in currentStep && currentStep.substeps.length ? (
                  <ul className={classes.ul}>
                    {buildSubsteps(currentStep.substeps, stepsConfig)}
                  </ul>
                ) : null}
              </Collapse>

            </li>
          )
        })
      }
    </ul>
  )
}

export default SideBar;