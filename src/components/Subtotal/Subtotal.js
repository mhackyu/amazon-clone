import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './Subtotal.scss';
import { useStateValue } from '../../store/StateProvider';
import { getBasketTotal } from '../../store/reducer';

function Subtotal() {
  const [{basket}] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
        Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      {/* <button onClick={(e) => history.push('/payment')}>
        Proceed to Checkout
      </button> */}

      <button>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
