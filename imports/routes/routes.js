import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory } from 'history'


import Login from "../ui/Login";
import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";
import Dashboard from "../ui/dashboard/Dashboard";
import {Tracker} from "meteor/tracker";

const history = createBrowserHistory();
const unauthenticatedPages = ["/","/signup"];
const authenticatedPages = ["/dashboard"];


Tracker.autorun(()=>{
    const isAuthenticated = !!Meteor.userId();
    history.push(); //Trigger history change on Authentication change
});

history.listen((location) => {
    const pathname = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    const isAuthenticated = Meteor.userId();

    if(isUnauthenticatedPage && isAuthenticated)
        history.replace("/dashboard");

    if(isAuthenticatedPage && !isAuthenticated)
        history.replace("/");
});


export const routes = (
    <Router history={history}>
        <Switch onEnter={history.push()}> /*Trigger history change on site enter */
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);

