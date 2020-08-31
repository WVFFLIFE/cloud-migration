import React from 'react';
import { makeStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ReportIcon from '@material-ui/icons/ReportProblemOutlined';
import Loader from '../Loader';
import Select from '../Select';
import Button from '../Button';
import clsx from 'clsx';

const useStylesItem = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxWidth: 552,
    width: '47%',
    padding: '10px 12px',
    border: '1px solid #A1ADCE',
    borderRadius: 6
  },
  errorRoot: {
    borderColor: '#C4001A'
  },
  fullName: {
    fontSize: 14,
    lineHeight: '21px',
    color: '#192B5D'
  },
  userFullName: {
    width: '50%',
  },
  login: {
    display: 'block',
    width: '50%',
    fontSize: 14,
    lineHeight: '21px',
    color: '#A1ADCE',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
})

const useStylesRoot = makeStyles({
  wrapper: {
    padding: 30,
  },
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
    '&:last-child': {
      marginBottom: 0
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '6%',
    height: 'auto'
  },
  targetWrapper: {
    width: '47%',
    maxWidth: 552
  },
  icon: {
    fontSize: '1.1rem',
    color: '#A1ADCE'
  },
  iconError: {
    color: '#C4001A'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: '#192B5D'
  },
  leftSide: {
    width: '47%',
    maxWidth: 552
  },
  center: {
    width: '6%'
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '47%',
    paddingRight: 15,
    maxWidth: 552
  },
  content: {
    maxHeight: 400,
    paddingRight: 15,
    paddingBottom: 15,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#fff'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E5E8EC'
    }
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
    borderTop: '1px solid #A1ADCE'
  },
  loadingCenter: {
    textAlign: 'center'
  }
})

const Item = ({
  data,
  withError = false,
  type
}) => {
  const classes = useStylesItem();

  const renderBody = () => {
    return type === 'users' ? (
      <>
        <span className={clsx(classes.fullName, classes.userFullName)}>{data.fullName}</span>
        <span className={classes.login} title={data.login}>{data.login}</span>
      </>
    ) : type === 'businessunits' ? (
      <span className={classes.fullName}>{data.name}</span>
    ) : type === 'teams' ? (
      <span className={classes.fullName}>{data.name}</span>
    ) : null
  }

  return (
    <div className={clsx(classes.root, {
      [classes.errorRoot]: withError
    })}>
      {renderBody()}
    </div>
  )
}

const MapSelectView = ({
  sourceList,
  targetList,
  handleSetToSource,
  handleClearAll,
  validationData,
  automapEntities,
  loading,
  forwardToNextStep,
  backToPrevStep,
  type = 'users',
  getOptionLabel,
  stepControlStatus
}) => {
  const classes = useStylesRoot();

  const { status } = validationData;

  const isClearButtonDisabled = sourceList.every(item => !item.target);

  return (
    <div className={clsx({ [classes.loadingCenter]: loading })}>
      {loading ? <Loader /> : (
        <>
          <div className={classes.wrapper}>
            <div className={classes.topBar}>
              <div className={classes.leftSide}>
                <p className={classes.title}>Source System</p>
              </div>
              <div className={classes.center}></div>
              <div className={classes.rightSide}>
                <p className={classes.title}>Target System</p>
                <Button
                  label="Clear all"
                  entity="clear"
                  onClick={handleClearAll}
                  disabled={isClearButtonDisabled}
                />
              </div>
            </div>
            <div className={classes.content}>
              {
                sourceList
                  .map(sourceItem => {
                  const withError = !!!sourceItem.target;
                  return (
                    <div className={classes.itemWrapper} key={sourceItem.source.guid}>
                      <Item
                        data={sourceItem.source}
                        withError={withError}
                        type={type}
                      />
                      <div className={classes.iconWrapper}>
                        {withError ? <ReportIcon className={clsx(classes.icon, classes.iconError)} /> : <ArrowForwardIcon className={classes.icon} />}
                      </div>
                      <div className={classes.targetWrapper}>
                        <Select
                          value={sourceItem.target}
                          options={targetList}
                          id={sourceItem.source.guid}
                          handleChange={handleSetToSource}
                          getOptionLabel={getOptionLabel}
                          type={type}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={classes.buttonsWrapper}>
            <div>
              <Button
                type="submit"
                label="Automate"
                disabled={status === 'loading' || loading || stepControlStatus === 'loading'}
                onClick={automapEntities}
              />
            </div>
            <div>
              <Button
                disabled={loading || status === 'loading' || stepControlStatus === 'loading'}
                entity="back"
                label="Back"
                onClick={backToPrevStep}
              />
              <Button
                disabled={status !== 'success' || loading || stepControlStatus === 'loading'}
                entity="next"
                label="Next"
                onClick={forwardToNextStep}
                loading={stepControlStatus === 'loading'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MapSelectView;