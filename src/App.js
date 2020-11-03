import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { auth } from './firebase';
import { useStateValue } from './store/StateProvider';

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const onAuthStateChanged = () => {
      auth.onAuthStateChanged((authUser) => {
        console.log('user: ', authUser);
  
        if (authUser) {
          dispatch({
            type: 'SET_USER',
            user: authUser,
          });
        } else {
          dispatch({
            type: 'SET_USER',
            user: null,
          });
        }
      });

    };

    onAuthStateChanged();
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Payment />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
