import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Layout/Login';
import Blog from './components/Blog/Blog';
import BlogDetail from './components/Blog/BlogDetail';
import Account from './components/Account/Account';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import WishList from './components/Product/WishList';
// redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
// local storage
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';
const persistedState = loadFromLocalStorage('stateInRedux');
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnchancer(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage('stateInRedux', store.getState()));

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/blog/list" component={Blog} />
            <Route path="/blog/detail/:id" component={BlogDetail} />
            <Route path="/account" component={Account} />
            <Route path="/product-detail/:prId" component={ProductDetail} />
            <Route path="/cart" component={Cart} />
            <Route path="/wish-list" component={WishList} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
