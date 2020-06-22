import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DragAndDrop from './DragAndDrop';
import ApiCall from './apiCall';


export const Router = () => (
      <Switch>
      <Route exact path="/api" component={ApiCall}/>
      <Route exact path="/drag-drop" component={DragAndDrop}/>

      </Switch>
);