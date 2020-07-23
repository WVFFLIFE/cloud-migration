import React from 'react';
import {
  makeStyles,
  Table as MuiTable,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tableRoot: {
    overflow: 'hidden'
  }
}))

const Table = ({
  children
}) => {
  const classes = useStyles();
  return (
    <MuiTable className={classes.tableRoot}>
      {children}
    </MuiTable>
  )
}

export default Table;