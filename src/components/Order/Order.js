import React, { useState, useEffect } from 'react';
import './Order.scss';
import OrderItem from '../OrderItem/OrderItem';
import { useStateValue } from '../../store/StateProvider';
import { db } from '../../lib/firebase';

function Order() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="order">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <OrderItem key={order.id} order={order}/>
        ))}
      </div>
    </div>
  );
}

export default Order;
