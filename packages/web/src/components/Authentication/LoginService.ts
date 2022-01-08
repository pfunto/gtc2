import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import ky from 'ky';
import firebase from '../../firebase';

async function login(email: string, password: string) {
  const auth = getAuth(firebase);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    getUser(userCredential.user);
  } catch (error) {
    // const errorCode = error.code;
    // console.log(errorCode);
  }
}

export default login;

async function getUser(user: User) {
  if (user) {
    await ky.get(`http://localhost:8888/api/users/${user.uid}`);
  }
}
