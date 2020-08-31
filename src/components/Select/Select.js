import React, { useState, useRef } from 'react';
import {
  makeStyles,
  Popover,
  MenuItem
} from '@material-ui/core';
import clsx from 'clsx';
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
      borderColor: '#192B5D'
    }
  },
  errorRoot: {
    borderColor: '#C4001A'
  },
  textWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1
  },
  fullName: {
    display: 'block',
    fontSize: 14,
    lineHeight: '21px',
    color: '#192B5D'
  },
  userFullName: {
    width: '50%'
  },
  login: {
    display: 'block',
    width: '50%',
    fontSize: 14,
    lineHeight: '21px',
    color: '#A1ADCE',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  expandIconWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    top: '50%',
    right: 10,
    padding: 2,
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    transition: 'all .15s linear',
    '&:hover': {
      background: 'rgba(0, 0, 0, .05)'
    }
  },
  expandIcon: {
    fontSize: '1.1rem',
    color: '#A1ADCE',
  },
  expandIconWrapperOpen: {
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
  },
  outlined: {
    '&.MuiSelect-outlined': {
      padding: '10px 12px',
      paddingRight: 32
    }
  },
  paper: props => ({
    width: props.width || 'auto',
    maxHeight: 300
  }),
  closeIconWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    top: '50%',
    right: 35,
    padding: 2,
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    transition: 'all .15s linear',
    '&:hover': {
      background: 'rgba(0, 0, 0, .05)',
    }
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
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef();
  const styleProps = { width: ref.current?.getBoundingClientRect().width };
  const classes = useStylesItem(styleProps);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeOption = (option) => {
    handleChange(id, option);
    handleClose();
  }

  const handleInitValue = (e) => {
    e.stopPropagation();
    handleChange(id, null);
  }

  const renderBody = () => {
    return (
      <div className={classes.textWrapper}>
        {
          type === 'users'
            ? (
              <>
                <span className={clsx(classes.fullName, classes.userFullName)}>{value?.fullName}</span>
                <span className={classes.login} title={value?.login}>{value?.login}</span>
              </>
            )
          : type === 'businessunits'
            ? <span className={classes.fullName}>{value?.name}</span>
          : type === 'teams'
            ? <span className={classes.fullName}>{value?.name}</span>
          : null
        }
      </div>
    )
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <div className={classes.root} onClick={handleOpen} ref={ref}>
        {renderBody()}
        {value ? (
          <div
            className={classes.closeIconWrapper}
            onClick={handleInitValue}
          >
            <CloseIcon className={classes.closeIcon} />
          </div>
        ) : null}
        <div className={clsx(classes.expandIconWrapper, {
          [classes.expandIconWrapperOpen]: open
        })}>
          <ExpandMoreIcon className={classes.expandIcon} />
        </div>
      </div>
      <Popover
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {options.map((option, idx) => {
          const isSelected = option.guid === value?.guid;
          return (
            <MenuItem key={idx} onClick={() => handleChangeOption(option)} selected={isSelected}>
              {getOptionLabel(option)}
            </MenuItem>
          )
        })}
      </Popover>
    </>
  )
}

export default React.memo(Select);