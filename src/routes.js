//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';
//Components
import Home from "./components/home";
import Legal from "./components/legal";
import Catalog from "./components/catalog/catalog";
import Company from "./components/company";
import Cookies from "./components/cookies";
import Rates from "./components/rates";
import Contacte from "./components/contacte";
import SingIn from './components/login/signIn'

/**
 * <Route /> is used to declaratively map routes to your application's component hierarchy. 
 * You would declare in path the path used in the URL and in render the single component to be rendered when the route matches the URL.
 */
const AppRoutes = () =>
   (
       <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/legal" render={() => <Legal />} />
            <Route exact path="/catalog" render={() => <Catalog />} />
            <Route exact path="/company" render={() => <Company />} />
            <Route exact path="/contacte" render={() => <Contacte />} />
            <Route exact path="/cookies" render={() => <Cookies />} />
            <Route exact path="/rates" render={() => <Rates />} />
            <Route exact path="/login" render={() => <SingIn type="login"/>} />
            <Route exact path="/register" render={() => <SingIn type="register"/>} />
       </Switch>
    );

export default AppRoutes;
