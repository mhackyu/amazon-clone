import axios from 'axios';

const config = {
  baseURL: 'https://stripe-payment-node.herokuapp.com',
};

const client = axios.create(config);

export default client;
