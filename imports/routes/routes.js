import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory } from 'history'


import Login from "../ui/Login";
import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";
import Dashboard from "../ui/Dashboard";

const history = createBrowserHistory();
const unauthenticatedPages = ["/","/signup"];
const authenticatedPages = ["/dashboard"];


const onEnterPublicPage = () =>{
    if(Meteor.userId())
        history.replace("/dashboard");
};
const onEnterPrivatePage = () =>{
    if(!Meteor.userId())
        history.replace("/");
};



export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login} onEnter={onEnterPublicPage} />
            <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
            <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);

export const onAuthCheck = (isAuthenticated)=>{
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if(isUnauthenticatedPage && isAuthenticated)
        history.replace("/dashboard");

    if(isAuthenticatedPage && !isAuthenticated)
        history.replace("/");
};

