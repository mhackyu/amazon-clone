import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Register.scss';
import { auth } from '../../lib/firebase';

function Register() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        alert('You are now registered!');
        history.push('/login');
      })
      .catch((err) => {
        setIsLoading(false);
        alert(`Something went wrong: ${err.message}`);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h5>Email</h5>
          <input
            name="email"
            type="email"
            ref={register({ required: true })}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="login__errorMessage">This is required.</p>
          )}
          <h5>Password</h5>
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="login__errorMessage">This is required.</p>
          )}
          <button
            className="login__signUpButton"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Sign Up'}
          </button>
        </form>

        <p>
          By signing-up you agree to the AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          className="login__registerButton"
          disabled={isLoading}
          onClick={() => history.push('/login')}
        >
          Already have an account? Sign-in here
        </button>
      </div>
    </div>
  );
}

export default Register;
