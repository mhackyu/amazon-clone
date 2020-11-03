import React from 'react';
import { Link } from 'react-router-dom';
import './Payment.scss';
import { useStateValue } from '../../store/StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleRemoveFromBasket = (index) => {
    dispatch({
      type: 'REMOVE_TO_BASKET',
      idx: index,
    });
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
            <h3>Payment Methiod</h3>
            <div className="payment__details"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
