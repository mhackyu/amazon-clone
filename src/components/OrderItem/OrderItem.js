import React from 'react';
import { format, fromUnixTime } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
import './OrderItem.scss';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

function OrderItem({ order }) {
  return (
    <div className="orderItem">
      <h2>Order</h2>
      <p>{format(fromUnixTime(order.data.created), 'MMMM dd, yyyy h:mma')}</p>
      <p className="orderItem__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket.map((item, index) => (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          hideRemoveButton
        />
      ))}

      <div className="orderItem__total">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <h3>Total Order: {value}</h3>
            </>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
    </div>
  );
}

export default OrderItem;
