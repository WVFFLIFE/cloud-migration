import React from 'react';
import {
  Table as MuiTable,
  TableContainer as MuiTableCotnainer,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxHeight: 550,
    '&::-webkit-scrollbar': {
      width: 8,
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#A1ADCE'
    }
  },
})

const Table = ({
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiTableCotnainer className={classes.container}>
      <MuiTable {...rest} stickyHeader>
        {children}
      </MuiTable>
    </MuiTableCotnainer>
  )
}

export default Table;