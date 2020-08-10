import React from 'react';
import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableSortLabel as MuiTableSortLabel,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  tableCellRoot: {
    padding: '19px 24px',
    fontSize: 12,
    lineHeight: '16px',
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    borderBottom: 0,
    color: '#A1ADCE',
    textTransform: 'uppercase',
  },
  jobsTableCellRoot: {
    padding: '19px 24px',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#A1ADCE'
  },
  sortLabelRoot: {
    '&.MuiTableSortLabel-active': {
      color: '#A1ADCE'
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  sortIcon: {
    color: '#A1ADCE !important'
  },
  stickyHeader: {
    background: '#fff',
    boxShadow: '7px 7px 9px 0 rgba(146,150,156,0.16)',
    '&:first-child': {
      boxShadow: '0px 7px 9px 0 rgba(146,150,156,0.16)'
    }
  },
  zeroBorder: {
    borderBottom: 0
  }
});

const TableHead = ({
  order,
  orderBy,
  cellsList,
  onRequestSort,
  withCheckbox,
  type,
  loading,
  ...rest
}) => {
  const classes = useStyles(true);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <MuiTableHead {...rest}>
      <MuiTableRow>
        {withCheckbox && !loading ? <MuiTableCell classes={{root: classes.zeroBorder, stickyHeader: classes.stickyHeader}}/> : null}
        {
          cellsList.map(({ fieldName, label, activeSort }) => {
            return (
              <MuiTableCell
                key={fieldName}
                classes={{
                  root: clsx(classes.tableCellRoot, {
                    [classes.jobsTableCellRoot]: type === 'jobs'
                  }),
                  stickyHeader: classes.stickyHeader
                }}
              >
                {activeSort ? (
                  <MuiTableSortLabel
                    active={orderBy === fieldName}
                    direction={orderBy === fieldName ? order : 'asc'}
                    onClick={createSortHandler(fieldName)}
                    classes={{
                      root: classes.sortLabelRoot,
                      icon: classes.sortIcon
                    }}

                  >
                    {label}
                    {orderBy === fieldName ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </MuiTableSortLabel>
                ) : label}
              </MuiTableCell>
            )
          })
        }
      </MuiTableRow>
    </MuiTableHead>
  )
}

export default TableHead;