import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { styled, Button, makeStyles } from '@material-ui/core';
import { JobsList, Stepper } from './containers';
import Header from './components/Header';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import authentication from './b2c';

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
    justifyContent: 'flex-end',
  }
})

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <TopBar>
        <div className="container">
          <div className={classes.row}>
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
        <Route exact path="/">
          <Redirect to="/migrationjob" />
        </Route>
        <Route exact path="/migrationjob" component={JobsList} />
        <Route exact path="/migrationjob/:id" component={Stepper} />
        <Redirect to="/migrationjob" />
      </Switch>
    </div>
  )
}

export default App;