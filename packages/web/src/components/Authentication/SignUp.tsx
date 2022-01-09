import 'twin.macro';
import 'styled-components/macro';
import { LockClosedIcon } from '@heroicons/react/solid';
import { SubmitHandler, useForm } from 'react-hook-form';
import firebase from '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';
import ky from 'ky';

type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const auth = getAuth(firebase);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const user = await ky.post('http://localhost:8888/api/users', {
          json: { email: email, firebaseId: userCredential.user.uid },
        });
        console.log(user.json());
      }
    } catch (error) {
      const firebaseError = error as AuthError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;

      console.log(errorCode, errorMessage);
    }
  };

  return (
    <>
      <div tw="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div tw="max-w-md w-full space-y-8">
          <div>
            <img
              tw="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            tw="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div tw="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" tw="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Please type in a valid email',
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="password" tw="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Please type in a password',
                    },
                  })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                tw="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                className="group"
              >
                <span tw="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    tw="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
