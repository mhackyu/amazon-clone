import React from 'react';
import './CheckoutProduct.scss';

function CheckoutProduct({ id, image, title, price, rating, onRemove }) {

  return (
    <div className="checkoutProduct">
      <img src={image} alt="cover" className="checkoutProduct__image" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={`${id}-${index}`}>🌟</p>
            ))}
        </div>
        <button onClick={onRemove}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
