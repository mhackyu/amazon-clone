import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPDMwnJEmAc3Aj6nJLn0UrQoV9SDMqAN0',
  authDomain: 'clone-c960f.firebaseapp.com',
  databaseURL: 'https://clone-c960f.firebaseio.com',
  projectId: 'clone-c960f',
  storageBucket: 'clone-c960f.appspot.com',
  messagingSenderId: '920057889617',
  appId: '1:920057889617:web:d850d680ae5be601b34970',
  measurementId: 'G-XH2GWB0PXN',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
