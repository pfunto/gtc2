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
  }

  if (userCredential && userCredential.user) {
    return await createUser(userCredential.user);
  }
}

async function login(
  // consider separate get request and firebase stuff?
  email: string,
  password: string
): Promise<User | undefined> {
  let userCredential;

  try {
    userCredential = await firebaseLogin(email, password);
  } catch (e) {
    const err = e as AuthError;
    // console.log(e);

    // if (err code is /auth/too-many-attempts)
    throw new Error('hello');
  }

  if (userCredential && userCredential.user) {
    return await getUser(userCredential.user);
  }
}

export { signUp, login };
