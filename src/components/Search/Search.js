import React, { useState } from 'react';
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
    border: '1px solid #D6D8DF',
    borderRadius: 5
  },
  icon: {
    fontSize: '1.4rem',
    color: '#0078D4'
  },
  input: {
    display: 'block',
    width: '100%',
    border: 0,
    outline: 0,
    '&::placeholder': {
      fontSize: 14,
      fontFamily: 'Segoe UI',
      fontStyle: 'normal',
      color: '#B8B4AF'
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