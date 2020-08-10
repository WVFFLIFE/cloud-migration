import React, {useState} from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
  formControlRoot: {
    maxWidth: 350,
    width: '100%',
    marginBottom: 25,
    '&:last-child': {
      marginBottom: 0
    }
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '6px 15px',
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    border: '1px solid #A1ADCE',
    borderRadius: 6,
    '&:focus, &:active': {
      border: '1px solid #192B5D',
      outline: 'none'
    },
    '&::placeholder': {
      fontSize: 16,
      color: '#A1ADCE'
    }
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
  },
  label: {
    display: 'block',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: '20px',
    color: "#192B5D"
  },
  passwordInput: {
    paddingRight: 35
  },
  visibilityIcon: {
    position: 'absolute',
    top: '50%',
    right: 12,
    fontSize: '1.1rem',
    color: '#A1ADCE',
    cursor: 'pointer',
    transform: 'translateY(-50%)'
  }
})

const TextField = ({
  value,
  handleChange,
  name,
  label,
  type = 'text',
  ...rest
}) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? VisibilityIcon : VisibilityOffIcon;
  const passwordType = isVisible ? 'text' : 'password';

  const handleChangeVisible = () => setIsVisible(!isVisible);
  
  return (
    <div className={classes.formControlRoot}>
      <label className={classes.label}>{label}</label>
      <div className={classes.inputWrapper}>
        <input 
          name={name}
          onChange={handleChange}
          value={value}
          type={type === 'password' ? passwordType : type}
          className={clsx(classes.input, {
            [classes.passwordInput]: type === 'password'
          })}
          {...rest}
        />
        {
          type === 'password' ? <Icon className={classes.visibilityIcon} onClick={handleChangeVisible}/> : null
        }
      </div>
    </div>
  )
}

export default React.memo(TextField);