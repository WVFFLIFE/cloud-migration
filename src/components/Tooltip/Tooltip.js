import React from 'react';
import {
  makeStyles,
  Tooltip as MuiTooltip
} from '@material-ui/core';

const useStyles = makeStyles({
  bodyWrapper: {
    maxWidth: 500,
    maxHeight: 400,
    padding: 30,
    background: '#FBFBFB',
    borderRadius: 4,
    boxShadow: '0 6.4px 14.4px 0 rgba(20,0,0,0.13)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#fff'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E5E8EC',
      borderRadius: 2
    }
  },
  title: {
    margin: 0,
    marginBottom: 25,
    fontSize: 24,
    fontWeight: 600,
    color: '#192B5D'
  },
  description: {
    margin: 0,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: '24px',
    color: '#3D3C5A',
    '&:last-child': {
      marginBottom: 0
    }
  }
});

const Tooltip = ({
  title,
  description = [],
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      classes={{
        tooltip: classes.bodyWrapper
      }}
      title={
        <>
          <p className={classes.title}>{title}</p>
          {description.map((item, idx) => (
            <p className={classes.description} key={idx}>{item}</p>
          ))}
        </>
      }
      {...rest}
    >
      {children}
    </MuiTooltip>
  )
}

export default Tooltip;