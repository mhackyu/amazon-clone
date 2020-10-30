import React from 'react';
import { useStateValue } from '../../store/StateProvider';
import './Product.scss';

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={`${id}-${index}`}>🌟</p>
            ))}
        </div>
      </div>

      <img className="product__cover" src={image} alt="cover" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
