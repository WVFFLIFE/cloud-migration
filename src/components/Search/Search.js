import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    padding: 6,
    border: '1px solid #A1ADCE',
    borderRadius: 5
  },
  icon: {
    marginRight: 5,
    fontSize: '1.25rem',
    color: '#192B5D',
    transform: 'scale(-1, 1)'
  },
  input: {
    display: 'block',
    width: '100%',
    fontSize: 16,
    color: "#192B5D",
    border: 0,
    outline: 0,
    '&::placeholder': {
      fontSize: 16,
      lineHeight: '20px',
      fontFamily: 'Segoe UI',
      fontStyle: 'normal',
      color: '#A1ADCE'
    }
  }
})

const Search = ({
  text,
  handleTextChange
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SearchIcon className={classes.icon} />
      <input
        className={classes.input}
        type="text"
        placeholder="Search"
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default Search;