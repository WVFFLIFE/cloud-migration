import React from 'react';
import {
  makeStyles,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  "@keyframes anim": {
    "0%": { backgroundPosition: "-250px 0" },
    "100%": { backgroundPosition: "250px 0" }
  },
  tableCell: {
    width: 200,
    minHeight: 60.8,
    padding: '19px 24px',
    boxSizing: 'border-box',
    background: '#fff'
  },
  mockWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mock: {
    width: '100%',
    height: 18.4,
    borderRadius: 5,
    background: "linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%)",
    backgroundSize: "500px 100px",
    animation: `$anim 1s linear forwards infinite`,
  }
}));

const TableBodyLoader = ({
  cellsList,
  rows
}) => {
  const classes = useStyles();
  return (
    <MuiTableBody>
      {

        Array(rows).fill('').map((row, index) => {
          return (
            <MuiTableRow
              key={index}
            >
              {
                cellsList.map(({ fieldName }) => {
                  return (
                    <MuiTableCell 
                      key={fieldName}
                      className={classes.tableCell}
                    >
                      <div className={classes.mockWrapper}>
                        <div className={classes.mock}></div>
                      </div>
                    </MuiTableCell>
                  )
                })
              }
            </MuiTableRow>
          )
        })
      }
    </MuiTableBody>
  )
}

export default TableBodyLoader;