import {
  AuthError,
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';
import axios from 'axios';
import firebase from '../../firebase';

async function firebaseLogin(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getAuth(firebase);
  return signInWithEmailAndPassword(auth, email, password);
}

async function getUser(user: User) {
  return axios.get(`http://localhost:8888/api/users/${user.uid}`);
}

async function login(email: string, password: string) {
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

export default login;
