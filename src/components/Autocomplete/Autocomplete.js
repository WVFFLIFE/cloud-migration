import React from 'react';
import { makeStyles } from '@material-ui/core';
import MuiAutocomplete from '@material-ui/lab/Autocomplete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles({
  inputRoot: {
    position: 'relative',
    display: 'flex',
    padding: '0 12px',
    width: '100%',
    minHeight: 42.8,
    border: '1px solid #A1ADCE',
    borderRadius: 6,
  },
  input: {
    display: 'block',
    width: '50%',
    marginRight: 15,
    fontSize: 14,
    fontFamily: 'Segoe UI',
    lineHeight: '21px',
    border: 0,
    color: '#192B5D',
    outline: 0
  },
  maxInput: {
    width: 'calc(100% - 64px)',
    marginRight: 0
  },
  expandIcon: {
    fontSize: '1.1rem',
    color: '#A1ADCE',
  },
  closeIcon: {
    fontSize: '1.1rem',
    color: '#A1ADCE',
  },
  adornmentRoot: {
    right: 12
  },
  login: {
    width: 'calc(50% - 55px)',
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: '21px',
    color: '#A1ADCE',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  iconRoot: {
    padding: 2
  },
  option: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    lineHeight: '21px',
    color: '#000'
  }
})

const Autocomplete = ({
  value,
  options,
  id,
  field,
  getOptionLabel,
  handleChange
}) => {
  const classes = useStyles();

  function renderInput(params) {
    const { endAdornment } = params.InputProps;
    const [closeEl, openEl] = endAdornment.props.children;

    const openBox = React.cloneElement(openEl, {
      ...openEl.props,
      key: "open",
      className: openEl.props.className.concat(` ${classes.iconRoot}`)
    }, [<ExpandMoreIcon className={classes.expandIcon} key="open" />]);
    const closeBox = React.cloneElement(closeEl, {
      ...closeEl.props,
      key: "close",
      className: closeEl.props.className.concat(` ${classes.iconRoot}`)
    }, [<CloseIcon className={classes.closeIcon} key="close" />]);
    const wrapper = React.cloneElement(endAdornment, {
      ...endAdornment.props,
      className: endAdornment.props.className.concat(` ${classes.adornmentRoot}`)
    }, [closeBox, openBox]);

    const showLogin = params.inputProps.value === value?.[field];

    return (
      <div ref={params.InputProps.ref} className={classes.inputRoot}>
        <input {...params.inputProps} className={clsx(classes.input, {
          [classes.maxInput]: !showLogin
        })} type="text" />
        {
          showLogin
            ? <span className={classes.login} title={value?.login}>{value?.login}</span>
            : null
        }
        {wrapper}
      </div>
    )
  }

  return (
    <MuiAutocomplete
      classes={{
        option: classes.option
      }}
      value={value}
      options={options}
      onChange={(e, newValue) => handleChange(id, newValue)}
      getOptionLabel={getOptionLabel}
      renderInput={renderInput}
    />
  )
}

export default React.memo(Autocomplete);