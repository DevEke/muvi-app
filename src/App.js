import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './App.css';
import MainView from './components/MainView/mainview';
import muviApp from './reducers/reducers';

const store = createStore(muviApp, applyMiddleware(thunk));

class MuviApp extends Component {
  render() {
      return (
          <Provider store={store}>
              <MainView />
          </Provider>
      )
  }
}

export default MuviApp;
