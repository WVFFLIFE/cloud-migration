import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { styled, Button, makeStyles } from '@material-ui/core';
import { JobsList, Stepper } from './containers';
import Tabs from './components/Tabs';
import Breadcrumbs from './components/Breadcrumbs';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import authentication from './b2c';

const Container = styled('div')({
  padding: '24px'
});

const TopBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  background: '#1F2E5F'
})

const useStyles = makeStyles({
  button: {
    padding: 5,
    minWidth: 'auto'
  },
  icon: {
    fontSize: '1.2rem',
    color: '#fff'
  }
})

const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <TopBar>
        <Tabs
          value={value}
          handleTabChange={handleTabChange}
        />
        <Button
          onClick={() => authentication.signOut()}
          classes={{
            root: classes.button
          }}
        >
          <ExitToAppIcon className={classes.icon}/>
        </Button>
      </TopBar>
      <Breadcrumbs />
      <Container>
        <Switch>
          <Route exact path="/">
            <Redirect to="/migrationjob" />
          </Route>
          <Route exact path="/migrationjob" component={JobsList}/>
          <Route exact path="/migrationjob/:id" component={Stepper}/>
          <Redirect to="/migrationjob" />
        </Switch>
      </Container>
    </div>
  )
}

export default App;