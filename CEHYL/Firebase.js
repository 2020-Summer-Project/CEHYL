import * as firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyCPfQpXzHIgbjoygz4ggnO8ecjEJ_QZJUo',
  authDomain: 'trackmyhealth-aea9b.firebaseapp.com',
  databaseURL: 'https://trackmyhealth-aea9b.firebaseio.com',
  projectId: 'trackmyhealth-aea9b',
  storageBucket: 'trackmyhealth-aea9b.appspot.com',
  messagingSenderId: '994108961272',
  appId: '1:994108961272:web:8ecb3819fedf1ed8eba60d',
  measurementId: 'G-BEGYSP3QLK',
};

firebase.initializeApp(config);

export default firebase;
