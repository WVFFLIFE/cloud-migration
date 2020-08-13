import React, { useState, useCallback, useMemo } from 'react';
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
import LoaderProgress from '../LoaderProgress';
import Search from '../Search';
import { entitiesTableConfig } from '../../config';
import { stableSort, getComparator } from '../../helpers';

const useStyles = makeStyles(() => ({
  contentWrapper: {
    padding: 30,
    paddingBottom: 0
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  controlsLast: {
    marginTop: 20,
    borderBottom: 0
  },
  amount: {
    display: 'block',
    paddingLeft: 14.5,
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Segoe UI',
    lineHeight: '21px',
    color: '#192B5D'
  },
  checkboxWrapper: {
    paddingRight: 10,
    paddingLeft: 7,
    borderRight: '1px solid #EAE9ED'
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxRoot: {
    padding: 9
  },
  searchWrapper: {
    maxWidth: 350,
    width: '100%'
  },
  cell: {
    padding: '19px 24px',
    background: '#fff'
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
    borderTop: '1px solid #A1ADCE'
  },
}))

const EntityStepView = ({
  loading,
  data,
  validationData,
  handleValidate,
  handleChangeSelectedEntities,
  selectedEntities,
  forwardToNextStep,
  backToPrevStep
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('displayName');
  const [searchValue, setSearchValue] = useState('');
  const { cellsList } = entitiesTableConfig;

  const handleSelectAll = useCallback((event) => {
    if (event.target.checked) {
      handleChangeSelectedEntities(
        data.map(item => item.logicalName)
      )
    } else {
      handleChangeSelectedEntities([])
    }
    
    /* eslint-disable-next-line */
  }, [data]);

  const handleSelectItem = (event, entity) => {
    handleChangeSelectedEntities(entity)
  }

  const handleChangeSearchValue = useCallback((e) => {
    e.persist();
    const { value } = e.target;

    setSearchValue(value);
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  }

  const modifyList = (list) => {
    return list
      .map(item => ({ ...item, displayName: item.displayName || '' }))
      .filter(item => searchValue ? item.displayName.toLowerCase().includes(searchValue.toLowerCase()) : true)
  }

  const renderRows = (list) => {
    return list
      .map(item => {
        const isSelected = selectedEntities.includes(item.logicalName)

        return (
          <EntitiesTableRow
            key={item.logicalName}
            data={item}
            selected={isSelected}
            disabled={validationData.status === 'loading'}
            handleCheckboxChange={handleSelectItem}
            cellsList={cellsList}
          />
        )
      })
  }

  const modifiedList = modifyList(data);
  const filteredData = stableSort(modifiedList, getComparator(order, orderBy));
  const totalItems = filteredData.length;
  const selectedCount = selectedEntities.length;
  const { status } = validationData;

  return (
    <>
      <div className={classes.contentWrapper}>
        <div className={classes.controls}>
          <div className={classes.leftSide}>
            <div
              className={classes.checkboxWrapper}
            >
              <Checkbox
                disabled={validationData.status === 'loading'}
                onChange={handleSelectAll}
                isItemSelected={selectedCount === filteredData.length}
                classes={{
                  root: classes.checkboxRoot
                }}
              />
            </div>
            <span className={classes.amount}>
              {selectedCount}/{totalItems} chosen
          </span>
          </div>
          <div className={classes.searchWrapper}>
            <Search
              text={searchValue}
              handleTextChange={handleChangeSearchValue}
            />
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
                renderRows={() => renderRows(filteredData)}
              />
            )}
        </Table>
      </div>
      <div className={classes.buttonsWrapper}>
        <div>
          <Button
            type="submit"
            disabled={loading || status === 'loading' || !selectedCount}
            onClick={() => handleValidate(selectedEntities)}
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
          <Button
            disabled={loading || status === 'loading'}
            entity="back"
            label="Back"
            onClick={backToPrevStep}
          />
          <Button
            disabled={status !== 'success'}
            entity="next"
            label="Next"
            onClick={forwardToNextStep}
          />
        </div>
      </div>
    </>
  )
}

export default EntityStepView;