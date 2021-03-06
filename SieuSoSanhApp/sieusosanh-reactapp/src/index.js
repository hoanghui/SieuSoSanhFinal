import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "./assets/css/bootstrap.min.css";
import "./assets/scss/paper-kit.scss?v=1.2.0";
import "../src/css/Header.css"
import "./css/home/ListCategory.css"
import "./css/listProductsByCategory/ListProductsPage.css"
import "./css/productDetailPage/productDetailPage.css"
import "./css/productDetailPage/priceTable.css"
import "./css/Navbar/Navbar.css"
import "./assets/demo/demo.css"
import "./css/Footer.css"


//redux
import {createStore,applyMiddleware,compose} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();