import React from 'react';
import {
  TableBody as MuiTableBody
} from '@material-ui/core';

const TableBody = ({
  renderRows
}) => {

  return (
    <MuiTableBody>
      {renderRows()}
    </MuiTableBody>
  )
}

export default TableBody;