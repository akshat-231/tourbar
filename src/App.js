import React from 'react';

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './users/pages/users.js';
import NewPlace from './places/pages/NewPlace.js';
import UserPlaces from './places/pages/UserPlaces.js';
import Auth from './users/pages/auth.js';
import UpdatePlace from './places/pages/UpdatePlace.js';
import MainNavigation from './shared/components/Navigation/Mainnavigation';
import { AuthContext } from './shared/context/auth-context.js';
import { useAuth } from './shared/hooks/auth-hook.js';


const App = () => {

  const {login, logout, token, userId} = useAuth();

  let routes;

  if(token){
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }
  else{
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>     

        <Route path="/auth">
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn : !!token, token: token, userId : userId, LogIn : login, LogOut : logout}}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
