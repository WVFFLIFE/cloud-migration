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
    marginRight: 10,
    fontSize: 17,
    fontWeight: 600,
    color: '#A1ADCE'
  },
  tabTitleActive: {
    color: '#192B5D'
  },
  selectedEntitiesCount: {
    fontSize: 14,
    fontWeight: 600,
    color: '#A1ADCE'
  },
  selectedEntitiesCountActive: {
    color: '#192B5D'
  }
})

const Tabs = ({
  currentTab,
  handleChangeTab,
  selectedEntities,
  data
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tabsList.map(tabItem => {
        const isActive = tabItem.id === currentTab;
        const totalCount = data.filter(item => item.category === tabItem.id).length;

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
            <span className={clsx(classes.selectedEntitiesCount, {
              [classes.selectedEntitiesCountActive]: isActive
            })}>{`${selectedEntities[tabItem.id].length} / ${totalCount}`}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs;