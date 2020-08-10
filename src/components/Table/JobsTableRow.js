import React from 'react';
import {
  makeStyles,
  TableRow as MuiTableRow,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    '&:last-child': {
      '& .MuiTableCell-root': {
        borderBottom: 0
      }
    }
  }
})

const JobsTableRow = ({
  data,
  cellsList,
  handleRowClick
}) => {
  const classes = useStyles();

  return (
    <MuiTableRow
      onClick={(e) => handleRowClick(e, data.id)}
      hover
      classes={{
        root: classes.root
      }}
    >
      {
        cellsList.map(({ fieldName, renderItem }) => {
          const cellData = fieldName in data ? data[fieldName] : null;

          return (
            <React.Fragment key={fieldName}>
              {fieldName === 'action' ? renderItem(data.id) : renderItem(cellData)}
            </React.Fragment>
          )
        })
      }
    </MuiTableRow>
  )
}

export default JobsTableRow;