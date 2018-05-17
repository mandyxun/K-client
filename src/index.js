import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import ProfileList from './components/my_profile/profile_index';
import ProfileDetail from './components/my_profile/profile_detail';
import ProfileEdit from './components/my_profile/profile_edit_form';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render( 
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          top menu
          <Route path="/my-profile/:id/edit" component={ProfileEdit} />
          <Route path="/my-profile/:id" component={ProfileDetail} />
          <Route path="/my-profile/" component={ProfileList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
