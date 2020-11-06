import React from 'react';
import { Link } from 'react-router-dom';
import './Checkout.scss';
import { useStateValue } from '../../store/StateProvider';
import Subtotal from '../Subtotal/Subtotal';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  const handleRemoveFromBasket = (index) => {
    dispatch({
      type: 'REMOVE_TO_BASKET',
      idx: index,
    });
  };

  return (
    <section className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads"
          className="checkout__ad"
        />
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>

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

          {basket?.length === 0 && <p>No items found. Shop <Link to="/">here</Link>.</p>}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </section>
  );
}

export default Checkout;
