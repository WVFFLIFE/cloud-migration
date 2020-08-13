import React, { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const useStylesItem = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 42.8,
    padding: '10px 12px',
    paddingRight: 55,
    border: '1px solid #A1ADCE',
    borderRadius: 6,
    cursor: 'pointer',
    '&:hover': {
      '& .MuiSvgIcon-root': {
        color: '#192B5D'
      }
    }
  },
  errorRoot: {
    borderColor: '#C4001A'
  },
  fullName: {
    marginRight: '15%',
    fontSize: 16,
    lineHeight: '21px',
    color: '#192B5D'
  },
  login: {
    fontSize: 16,
    lineHeight: '21px',
    color: '#A1ADCE'
  },
  expandIcon: {
    fontSize: '1.1rem',
    color: '#A1ADCE',
  },
  expandIconOpen: {
    transform: 'translateY(-50%) rotate(180deg)'
  },
  closeIcon: {
    fontSize: '1.1rem',
    color: '#A1ADCE',
  },
  endAdornment: {
    zIndex: 100
  },
  popupIndicator: {
    marginRight: 8
  }
})

const Select = ({
  value,
  options,
  getOptionLabel,
  handleChange,
  id,
  type
}) => {
  const classes = useStylesItem();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderBody = () => {
    return type === 'users' 
      ? (
        <>
        <span className={classes.fullName}>{value?.fullName}</span>
        <span className={classes.login}>{value?.login}</span>
        </>
      )
      : type === 'businessunits'
      ? <span className={classes.fullName}>{value?.name}</span>
      : type === 'teams'
      ? <span className={classes.fullName}>{value?.name}</span>
      : null
  }

  console.log(type);

  return (
    <Autocomplete
      classes={{
        endAdornment: classes.endAdornment,
        popupIndicator: classes.popupIndicator
      }}
      open={open}
      options={options}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={(e, newValue) => handleChange(id, newValue)}
      getOptionLabel={getOptionLabel}
      popupIcon={<ExpandMoreIcon className={classes.expandIcon} />}
      closeIcon={<CloseIcon className={classes.closeIcon} />}
      renderInput={(params) => (
        <div className={classes.root} ref={params.InputProps.ref}>
          {renderBody()}
          {params.InputProps.endAdornment}
          <input style={{ width: '100%', height: '100%', opacity: 0, position: 'absolute', left: 0, zIndex: 99, cursor: 'pointer' }} type="text" {...params.inputProps} />
        </div>
      )}
    />
  )
}

export default React.memo(Select);