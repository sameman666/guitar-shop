import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import App from './components/app/app.jsx';
import {Router as BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";

const browserHistory = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>,
    document.getElementById(`root`)
);
