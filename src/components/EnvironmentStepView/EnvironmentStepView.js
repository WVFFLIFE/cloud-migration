import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Collapse,
} from '@material-ui/core';
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@material-ui/icons'
import Button from '../Button'
import TextField from '../TextField'
import LoaderProgress from '../LoaderProgress'
import Loader from '../Loader'
import StatusNotification from '../StatusNotification'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20
  },
  disabledItem: {
    padding: '20px 40px',
    background: '#FAFAFA',
    color: '#A19F9D',
    "&:last-child": {
      borderTop: '0.5px solid rgba(0, 0, 0, 0.2)'
    }
  },
  activeItem: {
    background: '#fff',
    color: '#000'
  },
  title: {
    margin: 0,
    textTransform: 'uppercase'
  },
  colorTitle: {
    marginRight: 10,
    color: '#107C10'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center'
  },
  topBarSuccess: {
    background: '#DAF3DB'
  },
  successIcon: {
    marginRight: 10,
    color: '#107C10',
  },
  successMessage: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    color: '#919090'
  }
})

const EnvironmentStepView = ({
  title,
  handleFieldChange,
  validate,
  data,
  validationData,
  isActive,
  loading,
  handleCloseError
}) => {
  const classes = useStyles();
  const {status, message} = validationData;

  const isButtonDisabled = !data.Url || !data.User || !data.Password;

  return (
    <div className={clsx(classes.disabledItem, {
      [classes.activeItem]: isActive,
      [classes.topBarSuccess]: status === 'success'
    })}>
      {status === 'error' ? (
        <StatusNotification
          status="error"
          message={message}
          handleCloseClick={handleCloseError}
        />
      ) : null}
      <div className={classes.topBar}>
        {status === 'success' ? (
          <CheckCircleOutlineIcon className={classes.successIcon}/>
        ) : null}
        <span className={clsx(classes.title, {
          [classes.colorTitle]: status === 'success'
        })}>{title}</span>
        {" "}
        {" "}
        {status === 'success' ? (
          <span className={classes.successMessage}> — {message}</span>
        ) : null}
      </div>
      {loading
        ? <Loader />
        : (
          <Collapse in={isActive}>
            <form
              className={classes.form}
              onSubmit={validate}
            >
              <TextField
                handleChange={handleFieldChange}
                label="URL"
                name="Url"
                value={data.Url}
              />
              <TextField
                handleChange={handleFieldChange}
                label="Username"
                name="User"
                value={data.User}
              />
              <TextField
                handleChange={handleFieldChange}
                label="password"
                name="Password"
                type="password"
                value={data.Password}
              />
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
            </form>
          </Collapse>
        )
      }
    </div>
  )
}

export default EnvironmentStepView;