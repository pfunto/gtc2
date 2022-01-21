import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import firebase from '../firebase';
import api from '../app/api';
import { User } from '../components/Authentication/authSlice';

async function firebaseLogin(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getAuth(firebase);
  return signInWithEmailAndPassword(auth, email, password);
}

async function firebaseSignUp(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getAuth(firebase);
  return createUserWithEmailAndPassword(auth, email, password);
}

const createToken = async (user: FirebaseUser) => {
  const token = user && (await user.getIdToken());

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

async function getUser(firebaseUser: FirebaseUser): Promise<User> {
  const response = await api.get(`/users/${firebaseUser.uid}`);
  return response.data;
}

async function createUser(firebaseUser: FirebaseUser): Promise<User> {
  const response = await api.post(`/users`, {
    firebaseId: firebaseUser.uid,
    email: firebaseUser.email,
  });
  return response.data;
}

async function signUp(email: string, password: string) {
  let userCredential;

  try {
    userCredential = await firebaseSignUp(email, password);
  } catch (e) {
    const err = e as AuthError;
    console.log(err);
    console.log(`err.code`, err.code);
    console.log(`err.message`, err.message);

    if (err.code === 'auth/weak-password')
      throw new Error('Password should be at least 6 characters');

    if (err.code === 'auth/email-already-in-use')
      throw new Error('Email is already in use');

    throw new Error('You could not succesfully sign up');
  }

  if (userCredential && userCredential.user) {
    return await createUser(userCredential.user);
  }
}

async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  let userCredential;

  try {
    userCredential = await firebaseLogin(email, password);
  } catch (e) {
    const err = e as AuthError;

    if (err.code === 'auth/wrong-password')
      throw new Error('Wrong User/Password');

    if (err.code === 'auth/too-many-requests')
      throw new Error('Too many attempts, try later');

    throw new Error('You could not successfully log in');
  }

  if (userCredential && userCredential.user) {
    return await getUser(userCredential.user);
  }
}

export { signUp, login, createToken };
