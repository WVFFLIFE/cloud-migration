import React, {useEffect} from 'react';
import { Switch, Route, Redirect, NavLink, useHistory } from 'react-router-dom';
import { styled, Button, makeStyles } from '@material-ui/core';
import { JobsList, Stepper } from './containers';
import Header from './components/Header';
import ErrorPage from './components/ErrorPage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import authentication from './b2c';
import {initializeHttpClientSettings} from './services/migration.services';

const TopBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  minHeight: 41,
  background: '#1F2E5F'
})

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  button: {
    padding: 5,
    minWidth: 'auto'
  },
  icon: {
    fontSize: '1.2rem',
    color: '#fff'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 41
  },
  list: {
    display: 'flex',
    margin: 0,
    padding:0,
    listStyle: 'none'
  },
  link: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '5px 10px',
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#fff',
    textDecoration: 'none',
  },
  linkActive: {
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 2,
      background: '#F26026'
    }
  },
  listItem: {
    transition: 'all .15s linear',
    '&:hover': {
      background: 'rgba(0, 0, 0, .1)'
    }
  }
})

const App = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    initializeHttpClientSettings(history);

    /* eslint-disable-next-line */
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <TopBar>
        <div className="container">
          <div className={classes.row}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <NavLink to="/" className={classes.link} activeClassName={classes.linkActive} exact>Jobs List</NavLink>
              </li>
            </ul>
            <Button
              onClick={() => authentication.signOut()}
              classes={{
                root: classes.button
              }}
            >
              <ExitToAppIcon className={classes.icon} />
            </Button>
          </div>
        </div>
      </TopBar>
      <Switch>
        {/*<Route exact path="/">*/}
        {/*  <Redirect to="/" />*/}
        {/*</Route>*/}
        <Route exact path="/" component={JobsList} />
        <Route exact path="/:id" component={Stepper} />
        <Route exact path="/404" component={ErrorPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;
