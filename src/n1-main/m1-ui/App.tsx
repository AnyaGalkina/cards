import React from 'react';
import './App.css';
import {store} from "../m2-bll/store";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./routes/Main";

const  App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Provider store={store}>
            <Main />
        </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
