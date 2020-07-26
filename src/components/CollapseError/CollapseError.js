import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '15px 10px',
    borderRadius: 0
  },
  firstCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    minWidth: 20,
    padding: 0,
    background: '#f29e82',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)'
    }
  },
  secondCell: {
    display: 'inline-flex',
    background: '#F0B5A3',
  },
  thirdCell: {
    width: '100%',
    background: '#F0B5A3'
  },
  tableCell: {
    padding: 0,
    borderBottom: 0
  },
  root: {
    display: 'flex',
    transform: 'translate3d(100%, 0, 0)',
    transition: '.5s linear'
  },
  rootOpen: {
    transform: 'translate3d(0, 0, 0)',
  },
  chevronIcon: {
    fontSize: '1.3rem',
    color: '#D83B01'
  },
  warningIcon: {
    marginRight: 8,
    fontSize: '1rem',
    color: '#D83B01'
  },
  warningText: {
    fontSize: 14,
    lineHeight: '16px',
    color: '#D83B01'
  },
  message: {
    margin: 0,
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 1,
    color: '#605E5C',
    "&:last-child": {
      marginBottom: 0
    }
  },
  hide: {
    transform: 'translate3d(100%, 0, 0)',
    transition: '.15s linear'
  }
}))

const CollapseError = ({
  isOpen,
  messages,
  handleClose
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell 
        colSpan={5}
        className={classes.tableCell}
      >
        <Collapse
          timeout={500}
          in={isOpen}
        >
          <div className={clsx(classes.root, {
            [classes.rootOpen]: isOpen
          })}>
            <Button 
              onClick={handleClose}
              classes={{
                root: clsx(classes.cell, classes.firstCell)
              }}
            >
              <ChevronRightIcon className={classes.chevronIcon}/>
            </Button>
            <div className={clsx(classes.cell, classes.secondCell)}>
              <ReportProblemOutlinedIcon className={classes.warningIcon}/>
              <span className={classes.warningText}>Failed</span>
            </div>
            <div className={clsx(classes.cell, classes.thirdCell)}>
              {messages.map((message, index) => (
                <p
                  className={classes.message}
                  key={index}
                >
                  {message}
                </p>
              ))}
            </div>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default CollapseError;