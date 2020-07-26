import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableBodyLoader,
  EntitiesTableRow 
} from '../Table';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Pagination from '../Pagination';
import LoaderProgress from '../LoaderProgress';
import StatusNotification from '../StatusNotification';
import { entitiesTableConfig } from '../../config';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  paragraph: {
    margin: 0,
    marginBottom: 20,
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    color: '#878787'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottom: '2px solid #A19F9D'
  },
  controlsLast: {
    marginTop: 20,
    borderBottom: 0
  },
  amount: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Segoe UI',
    color: '#201F1E'
  },
  checkboxWrapper: {
    marginRight: 11,
    paddingLeft: 6
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const EntityStepView = ({
  loading,
  data,
  validationData,
  handleValidate,
  itemsPerPage,
  currentPage,
  order,
  orderBy,
  setPage,
  handleRequestSort,
  totalItems,
  setInitialStepValidation,
  handleChangeSelectedEntities,
  selectedEntities,
  handleInitSelectedEntities,
  notReportedList
}) => {
  const classes = useStyles();
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const { cellsList } = entitiesTableConfig;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setIsSelectedAll(true);
      handleInitSelectedEntities([])
    } else {
      setIsSelectedAll(false);
      handleInitSelectedEntities([])
    }
  }

  const handleSelectItem = (event, entity) => {
    handleChangeSelectedEntities(entity)
  }

  const renderRows = () => {
    return data.map(item => {
      const isSelected = selectedEntities.includes(item.logicalName)
      const isReported = notReportedList.includes(item.logicalName);

      return (
        <EntitiesTableRow
          key={item.logicalName} 
          data={item}
          selected={isSelectedAll ? !isSelected || isReported : isSelected || isReported}
          disabled={isReported}
          handleCheckboxChange={handleSelectItem}
          cellsList={cellsList}
        />
      )
    })
  }

  const handleSelectPage = useCallback((page) => setPage(page), [setPage]);

  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const selectedCount = isSelectedAll ? totalItems - selectedEntities.length : selectedEntities.length;
  const { status, message } = validationData;

  return (
    <div className={classes.root}>
      {['success', 'error'].includes(status) ? (
        <StatusNotification 
          status={status}
          message={message}
          handleCloseClick={setInitialStepValidation}
        />
      ) : null}
      <p className={classes.paragraph}>Please choose entities for migration</p>
      <div className={classes.controls}>
        <div className={classes.leftSide}>
          <div
            className={classes.checkboxWrapper}
          >
            <Checkbox
              onChange={handleSelectAll}
              isItemSelected={isSelectedAll ? isSelectedAll && !selectedEntities.length : selectedEntities.length === totalItems}
            />
          </div>
          <span className={classes.amount}>
            {selectedCount}/{totalItems} chosen
          </span>
        </div>
        <div>
          <Button
            type="button"
            disabled={loading || status === 'loading' || !selectedCount}
            handleClick={() => handleValidate(selectedEntities, isSelectedAll)}
          >
            Validate
              {status !== 'hidden' ? (
              <LoaderProgress
                status={status}
              />
            ) : null}
          </Button>
        </div>
      </div>
      <Table>
        <TableHead
          order={order}
          orderBy={orderBy}
          cellsList={cellsList}
          withCheckbox
          onRequestSort={handleRequestSort}
          loading={loading}
        />
        {loading ? (
          <TableBodyLoader
            rows={3}
            cellsList={cellsList}
          />
        ) : (
            <TableBody
              renderRows={renderRows}
            />
          )}
      </Table>
      <Pagination
        disabled={loading || status === 'loading'}
        maxPage={maxPage}
        currentPage={currentPage}
        handleSelectPage={handleSelectPage}
        diff={3}
      />
      <div className={clsx(classes.controls, classes.controlsLast)}>
        <div className={classes.leftSide}>
          <span className={classes.amount}>
            {selectedCount}/{totalItems} chosen
          </span>
        </div>
        <div>
          <Button
            type="button"
            disabled={loading || status === 'loading' || !selectedCount}
            handleClick={() => handleValidate(selectedEntities, isSelectedAll)}
          >
            Validate
              {status !== 'hidden' ? (
              <LoaderProgress
                status={status}
              />
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EntityStepView;