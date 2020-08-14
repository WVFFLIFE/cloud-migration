import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core';
import Button from '../Button'
import TextField from '../TextField'
import LoaderProgress from '../LoaderProgress'
import Loader from '../Loader'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  disabledItem: {
    color: '#A19F9D',
  },
  activeItem: {
    background: '#fff',
    color: '#000'
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30
  },
  fieldsWrapper: {
    width: '100%',
    padding: 30,
    borderBottom: '1px solid #A1ADCE'
  },
  center: {
    textAlign: 'center'
  }
})

const EnvironmentStepView = ({
  handleFieldChange,
  validate,
  data,
  validationData,
  loading,
  forwardToNextStep,
  backToPrevStep,
}) => {
  const classes = useStyles();
  const { status } = validationData;

  const isButtonDisabled = !data.Url || !data.User || !data.Password;

  return (
    <div className={clsx(classes.disabledItem, {
      [classes.center]: loading,
    })}>
      {loading
        ? <Loader />
        : (
          <form
            className={classes.form}
            onSubmit={validate}
          >
            <div className={classes.fieldsWrapper}>
              <TextField
                handleChange={handleFieldChange}
                label="URL"
                name="Url"
                value={data.Url}
                placeholder="https://"
              />
              <TextField
                handleChange={handleFieldChange}
                label="Username"
                name="User"
                value={data.User}
                placeholder="Login"
              />
              <TextField
                handleChange={handleFieldChange}
                label="Password"
                name="Password"
                type="password"
                value={data.Password}
              />
            </div>
            <div className={classes.buttonsWrapper}>
              <div>
                <Button
                  type="submit"
                  disabled={status === 'loading' || isButtonDisabled}
                >
                  Validate
              {status !== 'hidden' ? (
                    <LoaderProgress
                      status={status}
                    />
                  ) : null}
                </Button>
              </div>
              <div>
                {backToPrevStep ? <Button
                  disabled={loading}
                  entity="back"
                  label="Back"
                  onClick={backToPrevStep}
                /> : null}
                <Button
                  disabled={status !== 'success'}
                  entity="next"
                  label="Next"
                  onClick={forwardToNextStep}
                />
              </div>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default EnvironmentStepView;