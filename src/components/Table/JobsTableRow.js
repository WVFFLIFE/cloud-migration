import React from 'react';
import {
  makeStyles,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    '&:last-child': {
      '& .MuiTableCell-root': {
        borderBottom: 0
      }
    }
  },
  content: {
    display: 'block',
    padding: '19px 24px',
    textDecoration: 'none'
  },
  tableCell: {
    padding: 0
  }
})

const JobsTableRow = ({
  data,
  cellsList,
}) => {
  const classes = useStyles();

  return (
    <MuiTableRow
      hover
      classes={{
        root: classes.root
      }}
    >
      {
        cellsList.map(({ fieldName, renderItem }) => {
          const cellData = fieldName in data ? data[fieldName] : null;

          return (
            <MuiTableCell key={fieldName} classes={{root: classes.tableCell}}>
              <Link to={`/${data.id}`} className={classes.content}>
                {fieldName === 'action' ? renderItem(data.id) : renderItem(cellData)}
              </Link>
            </MuiTableCell>
          )
        })
      }
    </MuiTableRow>
  )
}

export default JobsTableRow;
