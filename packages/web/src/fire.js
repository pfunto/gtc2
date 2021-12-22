import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBfd9EFV3kt9vXBkVkq4_D6HNeRgc_-r9A',
  authDomain: 'group-tip-calculator-acfb6.firebaseapp.com',
  projectId: 'group-tip-calculator-acfb6',
  storageBucket: 'group-tip-calculator-acfb6.appspot.com',
  messagingSenderId: '120955734484',
  appId: '1:120955734484:web:392e69c9edf7a699dfae41',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;
export default fire;
