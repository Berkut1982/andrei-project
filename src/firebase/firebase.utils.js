import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDQJmH1O-jhV0rjbngB02Z27ItUzbL-dlI',
  authDomain: 'e-store-db-7ec15.firebaseapp.com',
  databaseURL: 'https://e-store-db-7ec15.firebaseio.com',
  projectId: 'e-store-db-7ec15',
  storageBucket: 'e-store-db-7ec15.appspot.com',
  messagingSenderId: '192019981654',
  appId: '1:192019981654:web:20251889a893eb134922f7',
  measurementId: 'G-FMRMW1KE90'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
