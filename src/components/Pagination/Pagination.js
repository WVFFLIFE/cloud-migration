import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getOrderList } from '../../helpers';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  page: {
    minWidth: 33,
    marginRight: 6,
    padding: '2px 8px',
    transition: 'none',
  },
  label: {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#605E5C'
  },
  activeLabel: {
    color: '#fff'
  },
  activePage: {
    background: '#0078D4',
    borderRadius: 4,
    '&:hover' : {
      background: 'rgba(0, 120, 212, .8)'
    }
  },
  nextBtn: {
    marginRight: 0,
  },
  icon: {
    fontSize: '1.2rem',
    color: "#302846"
  },
  disabledIcon: {
    color: 'rgba(0, 0, 0, 0.26)'
  },
  disabledText: {
    color: 'rgba(0, 0, 0, 0.26)'
  }
}))

const Pagination = ({
  maxPage,
  currentPage,
  handleSelectPage,
  diff = 3,
  disabled = false
}) => {
  const classes = useStyles();
  const page = currentPage + 1;
  const step = diff * 2 + 1;
  const orderList = getOrderList(page, maxPage, diff, step);
  const shouldLeftDots = page + diff > step;
  const shouldRightDots = page + diff < maxPage;

  return (
    <div className={classes.root}>
      <Button
        classes={{
          root: classes.page
        }}
        onClick={() => handleSelectPage(currentPage - 1)}
        disabled={page === 1 || disabled}
      >
        <ChevronLeftIcon className={clsx(classes.icon, {
          [classes.disabledIcon]: page === 1 || disabled
        })}/>
      </Button>
      {shouldLeftDots ? <span className={clsx(classes.dots, classes.page)}>...</span> : null}
      <div>
        {orderList.map(order => {
          const isActive = order === page;
          return (
            <Button
              key={order}
              classes={{
                root: clsx(classes.page, {
                  [classes.activePage]: isActive 
                }),
                label: clsx(classes.label, {
                  [classes.activeLabel]: isActive,
                  [classes.disabledText]: disabled
                }),
              }}
              onClick={() => handleSelectPage(order - 1)}
              disabled={disabled}
            >
              {order}
            </Button>
          )
        })}
      </div>
      {shouldRightDots ? <span className={clsx(classes.dots, classes.page)}>...</span> : null}
      <Button
        classes={{
          root: clsx(classes.page, classes.nextBtn)
        }}
        onClick={() => handleSelectPage(currentPage + 1)}
        disabled={page === maxPage || disabled}
      >
        <ChevronRightIcon className={clsx(classes.icon, {
          [classes.disabledIcon]: page === maxPage || disabled
        })}/>
      </Button>
    </div>
  )
}

export default React.memo(Pagination);