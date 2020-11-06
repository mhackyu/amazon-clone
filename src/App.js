import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Order from './components/Order/Order';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { auth } from './firebase';
import { useStateValue } from './store/StateProvider';

const stripePromise = loadStripe(
  'pk_test_51HjGR0ACskQUiCFrZgb2LKgGsBht1hHaPFDOSXJ8zlOPngPkQQv18fWuQz6aihUisW7xSMs30jVkZgzoKaKN5Pmt00muIQvXX1'
);

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
          <PrivateRoute path="/orders">
            <Header />
            <Order />
          </PrivateRoute>
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
          <PrivateRoute path="/payment">
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </PrivateRoute>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const [{ user }] = useStateValue();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
