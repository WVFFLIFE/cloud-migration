import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const tabsList = [
  { id: 'CoreRecords', title: 'Core Records' },
  { id: 'MarketingAndSales', title: 'Marketing & Sales' },
  { id: 'Service', title: 'Service' },
  { id: 'Miscellaneous', title: 'Misc' },
  { id: 'CustomEntities', title: 'Custom entities' }
]

const useStyles = makeStyles({
  root: {
    display: 'flex',
    background: '#FAFBFC'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    background: '#FAFBFC',
    borderRight: '1px solid rgba(179,186,205,0.23)',
    cursor: 'pointer',
    '&:last-child': {
      flex: 1,
      justifyContent: 'flex-start',
      borderRightColor: 'transparent',
    }
  },
  tabActive: {
    background: '#fff',
    borderRightColor: 'transparent',
    cursor: 'default'
  },
  tabTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: '#A1ADCE'
  },
  tabTitleActive: {
    color: '#192B5D'
  }
})

const Tabs = ({
  currentTab,
  handleChangeTab
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tabsList.map(tabItem => {
        const isActive = tabItem.id === currentTab;
        return (
          <div
            onClick={() => handleChangeTab(tabItem.id)}
            id={tabItem.id}
            key={tabItem.id}
            className={clsx(classes.tab, {
              [classes.tabActive]: isActive
            })}
          >
            <span className={clsx(classes.tabTitle, {
              [classes.tabTitleActive]: isActive
            })}>
              {tabItem.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs;