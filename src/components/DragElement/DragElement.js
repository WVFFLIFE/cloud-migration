import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles({
  item: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: '10px 25px',
    paddingRight: 15,
    background: '#F9FBFC',
    border: '0.5px solid #ccc',
  },
  subItem: {
    marginBottom: 20,
    marginLeft: 20,
    background: '#fff'
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    display: 'block',
    marginRight: 70,
    fontSize: 14,
    fontWeight: 600,
    color: '#302846'
  },
  subtext: {
    display: 'block',
    fontSize: 14,
    fontWeight: 400,
    color: '#605E5C'
  },
  dragIndicator: {
    position: 'absolute',
    left: 6,
    top: 12.5,
    fontSize: '1rem',
    color: '#ccc'
  },
  button: {
    minWidth: "auto",
    padding: 1,
    borderRadius: '50%'
  },
  icon: {
    fontSize: '1rem',
    fill: '#201F1E'
  },
  error: {
    border: '0.5px solid #D83B01'
  },
  warning: {
    fontSize: '1rem',
    color: '#D83B01'
  },
  dragging: {
    opacity: 0.8,
    '& ~ [data-rbd-placeholder-context-id]': {
      display: 'none !important'
    },
    '& ~ div': {
      transform: 'none !important'
    }
  }
});

const DragElement = React.forwardRef(({
  data,
  handleCancel,
  isError = false,
  sub = false,
  withDragIcon = false,
  type,
  dragging = false,
  ...rest
}, ref) => {
  const classes = useStyles();

  const field = type === 'user'
    ? 'fullName'
    : type === 'unit'
    ? 'name'
    : type === 'team'
    ? 'name'
    : 'name';

  return (
    <div
      className={clsx(classes.item, {
        [classes.subItem]: sub,
        [classes.error]: isError,
        [classes.dragging]: dragging
      })}
      ref={ref}
      {...rest}
    >
      {sub || withDragIcon ? <DragIndicatorIcon className={clsx(classes.dragIndicator, {
        [classes.subDragIndicator]: sub
      })} /> : null}
      <div
        className={classes.textWrapper}
      >
        <span className={classes.text}>{data[field]}</span>
        {['user', 'team'].includes(type) ? <span className={classes.subtext}>{data.login}</span> : null}
      </div>
      {
        isError ? <ReportProblemOutlinedIcon className={classes.warning}/> : null
      }
      {sub ? (
        <Button
          classes={{
            root: classes.button
          }}
          onClick={() => handleCancel(data)}
        >
          <CloseIcon className={classes.icon} />
        </Button>
      ) : null}
    </div>
  )
})

export default DragElement;