import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {routes,onAuthCheck} from "../imports/routes/routes";
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(()=>{
    const isAuthenticated = !!Meteor.userId();
    onAuthCheck(isAuthenticated);
});


Meteor.startup(()=>{
  ReactDOM.render(routes,document.getElementById("app"));
});