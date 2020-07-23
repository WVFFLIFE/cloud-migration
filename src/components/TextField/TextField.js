import React from 'react';

import {
  makeStyles,
  TextField as MuiTextField
} from '@material-ui/core';

const useStyles = makeStyles({
  formControlRoot: {
    maxWidth: 350,
    width: '100%',
    marginBottom: 25,
  },
  input: {
    padding: '6px 15px',
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 400
  },
  outlined: {
    fontSize: 12,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#A6AAB8',
    textTransform: 'capitalize',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(16px, 5px) scale(0.9)'
    }
  },
  formControl: {
    top: -10
  }
})

const TextField = ({
  value,
  handleChange,
  name,
  label,
  type = 'text'
}) => {
  const classes = useStyles();
  
  return (
    <MuiTextField
      onChange={handleChange}
      label={label}
      name={name}
      value={value}
      type={type}
      variant="outlined"
      classes={{
        root: classes.formControlRoot
      }}
      InputProps={{
        classes: {
          input: classes.input,
        }
      }}
      InputLabelProps={{
        classes: {
          outlined: classes.outlined,
          formControl: classes.formControl
        }
      }}
    />
  )
}

export default TextField;