import React from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { WarningIcon, SkypeIcon } from '../Icons';
import {
  CheckCircleOutlineOutlined as CheckIcon
} from '@material-ui/icons';
import clsx from 'clsx';
import {httpClient} from '../../services/migration.services';
import FileSaver from 'file-saver';
import format from 'date-fns/format';
import xlsxIcon from '../../assets/images/xlsx.png';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    padding: 20,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 9.6px 18.6px 0 rgba(161,173,206,0.12)'
  },
  icon: {
    marginRight: 15,
    fontSize: '1.3rem',
  },
  iconError: {
    fontSize: 23,
    color: '#C4001A'
  },
  iconSuccess: {
    color: '#192B5D'
  },
  message: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#201F1E'
  },
  errorMessage: {
    color: '#C4001A'
  },
  closeIcon: {
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#201F1E'
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  errorTextWrapper: {
    maxWidth: '40%',
  },
  skypeContactWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  skypeText: {
    margin: 0,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '21px',
    color: '#192B5D'
  },
  skypeIcon: {
    marginRight: 8
  },
  skypeLink: {
    fontSize: 14,
    lineHeight: '24px',
    color: '#F26026'
  },
  xlsxIcon: {
    display: 'block',
    maxWidth: '100%',
    width: 20,
    height: 'auto',
    marginRight: 10
  },
  downloadWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  downloadText: {
    fontSize: 14,
    lineHeight: '21px',
    color: '#f26026',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}))

const StatusNotification = ({
  status,
  message,
  currentStep
}) => {
  const classes = useStyles();
  const {id} = useParams();
  const isSuccess = status === 'success';
  const isError = !isSuccess;

  const handleClick = () => {
    const fileName = `Reports ${format(new Date(), 'dd.MM.yyyy hh:mm:ss')}.xlsx`
    httpClient
      .get(`/${id}/download/report`, {responseType: 'blob'})
      .then(res => FileSaver.saveAs(res.data, fileName))
  }

  const isErrorWrapper = ['sourcenvironment', 'targetenvironment'];

  return (
    <div
      className={classes.root}
    >
      <div className={clsx(classes.textWrapper, {
        [classes.errorTextWrapper]: status === 'error' && isErrorWrapper.includes(currentStep) 
      })}>
        {isSuccess ? (
          <CheckIcon className={clsx(classes.icon, classes.iconSuccess)} />
        ) : (
            <WarningIcon
              className={clsx(classes.icon, classes.iconError)}
            />
          )}
        <span className={clsx(classes.message, {
          [classes.errorMessage]: isError
        })}>{message}</span>
      </div>
      {currentStep === 'entities' && status === 'error' ? (
        <div className={classes.downloadWrapper}>
          <img src={xlsxIcon} alt="Download report" className={classes.xlsxIcon}/>
          <span className={classes.downloadText} onClick={handleClick}>Export in XSLX</span>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className={classes.skypeContactWrapper}>
          <p className={classes.skypeText}>Contact us via skype</p>
          <SkypeIcon color="#F26026" className={classes.skypeIcon}/>
          <a href="skype:live:uds_ddt?chat" className={classes.skypeLink}>helptomigrate_skype</a>
        </div>
      ) : null}
    </div>
  )
}

export default StatusNotification;