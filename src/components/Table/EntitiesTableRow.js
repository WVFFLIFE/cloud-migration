import React, { useState } from 'react';
import {
  makeStyles,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Checkbox as MuiCheckbox
} from '@material-ui/core';
import CollapseError from '../CollapseError';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles({
  cellRoot: {
    padding: 6,
  },
  tableCellBorder: {
    borderLeft: '1px solid #ccc'
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
    background: '#0078D4',
    borderColor: '#0078D4'
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
      background: '#EBF6FF'
    },
    '&:hover': {
      '&.Mui-selected': {
        background: '#EBF6FF'
      },
    }
  },
  disabled: {
    background: '#EBF6FF'
  },
  disabledIcon: {
    borderColor: '#ccc',
    background: '#ccc'
  }
})

const EntitiesTableRow = ({
  data,
  selected,
  handleCheckboxChange,
  cellsList,
  disabled
}) => {
  const classes = useStyles();
  const [errorView, setErrorView] = useState(false);

  const toggleError = () => {
    setErrorView(flag => !flag);
  }

  const handleClose = () => {
    setErrorView(false);
  }

  const shouldCollapseVisible = data.validationSettings && data.validationSettings.status === 'error';

  return (
    <React.Fragment>
      {shouldCollapseVisible ? (
        <CollapseError
          isOpen={errorView}
          messages={data.validationSettings.message}
          handleClose={handleClose}
        />
      ) : null}
      <MuiTableRow
        classes={{
          root: clsx(classes.selected, {
            [classes.disabled]: disabled
          })
        }}
        tabIndex={-1}
        selected={selected}
      >
        <MuiTableCell
          padding="checkbox"
          classes={{
            root: clsx(classes.cellRoot, classes.tableCellBorder)
          }}
        >
          <MuiCheckbox 
            disabled={disabled}
            onChange={event => handleCheckboxChange(event, data.logicalName)}
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon, {
              [classes.disabledIcon]: disabled
            })}><CheckIcon className={classes.checkIcon} /></span>}
            icon={<span className={classes.icon}></span>}
            checked={selected}
            color="default"
          />
        </MuiTableCell>
        {
          cellsList.map(({fieldName, renderItem}) => {
            const cellData = fieldName in data ? data[fieldName] : null;
            const render = fieldName === 'validationSettings' ? renderItem(toggleError) : renderItem;

            return (
              <React.Fragment key={fieldName}>
                {render(cellData)}
              </React.Fragment>
            )
          })
        }
      </MuiTableRow>
    </React.Fragment>
  )
}

export default EntitiesTableRow;