import React from 'react';
import {
  makeStyles,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Checkbox as MuiCheckbox
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles({
  cellRoot: {
    padding: 6,
  },
  icon: {
    position: 'relative',
    width: 16,
    height: 16,
    border: '1px solid #323130',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  checkedIcon: {
    background: '#192B5D',
    borderColor: '#192B5D'
  },
  checkIcon: {
    position: 'absolute',
    top: -1,
    left: -1,
    fontSize: '1rem',
    color: '#fff'
  },
  selected: {
    '&.Mui-selected': {
      background: 'transparent',
    },
    '&:hover': {
      '&.Mui-selected': {
        background: 'transparent'
      },
    }
  },
  rowRoot: {
    '&:last-child': {
      '& .MuiTableCell-root': {
        borderBottomColor: 'transparent'
      }
    }
  },
  rowError: {
    background: '#FFE9E1 !important'
  }
})

const EntitiesTableRow = ({
  data,
  selected,
  handleCheckboxChange,
  cellsList,
  disabled,
}) => {
  const classes = useStyles();

  const isError = data.validationSettings && data.validationSettings.status === 'error';

  return (
    <React.Fragment>
      <MuiTableRow
        classes={{
          root: clsx(classes.rowRoot, classes.selected, {
            [classes.rowError]: isError
          })
        }}
        tabIndex={-1}
        selected={selected}
      >
        <MuiTableCell
          padding="checkbox"
          classes={{
            root: classes.cellRoot
          }}
        >
          <MuiCheckbox
            disabled={disabled}
            onChange={event => handleCheckboxChange(event, data.logicalName)}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)}>
                <CheckIcon className={classes.checkIcon} />
              </span>
            }
            icon={<span className={classes.icon}></span>}
            checked={selected}
            color="default"
          />
        </MuiTableCell>
        {
          cellsList.map(({ fieldName, renderItem }) => {
            const cellData = fieldName in data ? data[fieldName] : null;

            return (
              <React.Fragment key={fieldName}>
                {renderItem(cellData)}
              </React.Fragment>
            )
          })
        }
      </MuiTableRow>
    </React.Fragment>
  )
}

export default EntitiesTableRow;