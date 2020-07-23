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
    padding: 12,
    fontSize: 13,
    lineHeight: '20px',
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    color: '#757588',
  },
  jobsTableCellRoot: {
    padding: 11.5,
    fontSize: 12
  },
  sortLabelRoot: {
    '&.MuiTableSortLabel-active': {
      color: '#757588'
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
  leftBorder: {
    borderLeft: '1px solid #ccc'
  }
});

const TableHead = ({
  order,
  orderBy,
  cellsList,
  onRequestSort,
  withCheckbox,
  type,
  loading
}) => {
  const classes = useStyles(true);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <MuiTableHead>
      <MuiTableRow>
        {withCheckbox && !loading ? <MuiTableCell classes={{root: classes.leftBorder}}/> : null}
        {
          cellsList.map(({ fieldName, label, activeSort }) => {
            return (
              <MuiTableCell
                key={fieldName}
                classes={{
                  root: clsx(classes.tableCellRoot, {
                    [classes.jobsTableCellRoot]: type === 'jobs'
                  })
                }}
              >
                {activeSort ? (
                  <MuiTableSortLabel
                    active={orderBy === fieldName}
                    direction={orderBy === fieldName ? order : 'asc'}
                    onClick={createSortHandler(fieldName)}
                    classes={{
                      root: classes.sortLabelRoot
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