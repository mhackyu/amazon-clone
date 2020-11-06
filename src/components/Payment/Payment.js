import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import './Payment.scss';
import { useStateValue } from '../../store/StateProvider';
import { getBasketTotal } from '../../store/reducer';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import httpClient from '../../lib/httpClient';
import { db } from '../../firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  useEffect(() => {
    // generate the stripe secret which allow us to charge a customer
    const getClientSecret = async () => {
      const { data } = await httpClient.post(
        // Stripe expects the total in a currencies subunits
        `/payments?total=${getBasketTotal(basket) * 100}`
      );

      setClientSecret(data.clientSecret);
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket]);

  const handleRemoveFromBasket = (index) => {
    dispatch({
      type: 'REMOVE_TO_BASKET',
      idx: index,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // paymentIntent = payment confirmation
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

    setIsLoading(false);

    dispatch({
      type: 'EMPTY_BASKET',
    });

    console.log(paymentIntent);
    history.replace('/orders');
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: 'black',
        color: 'black',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '18px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: 'grey' },
      },
      invalid: {
        iconColor: 'red',
        color: 'red',
      },
    },
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 Awesome St.</p>
            <p>San Pedro City, Laguna, Philippines</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                onRemove={() => handleRemoveFromBasket(index)}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement options={CARD_OPTIONS} />

              <div className="payment__price">
                <button type="submit" disabled={!stripe || isLoading}>
                  {isLoading ? 'Please wait...' : 'Pay '}
                  {!isLoading && (
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          {value}
                        </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
