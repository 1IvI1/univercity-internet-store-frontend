import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Routes from './components/routes/Routes';
import { InitWebsocket } from './websocket/InitWebsocket';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxStore from "./redux/store"
import { composeWithDevTools } from "redux-devtools-extension";

// const ws = InitWebsocket({ url: "ws://127.0.0.1:4000" });

function App() {
  const store = createStore(combineReducers(reduxStore), composeWithDevTools())
  console.log('store', store)
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
