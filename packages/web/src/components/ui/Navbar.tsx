/* This example requires Tailwind CSS v2.0+ */
import 'twin.macro';
import 'styled-components/macro';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
// import { PlusSmIcon } from '@heroicons/react/solid';

const Navbar = () => {
  const signOut = () => {
    const auth = getAuth(firebase);
    auth.signOut();
  };

  const tabs = [
    { name: 'Home', href: '/home' },
    { name: 'items', href: '' },
  ];

  return (
    <>
      <div tw="flex items-center justify-between bg-gray-800 py-2 sm:px-6 lg:px-8">
        <div tw="flex">
          <div tw="flex-shrink-0">
            <img
              tw="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              tw="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div tw="hidden sm:block sm:ml-6">
            <div tw="flex space-x-4">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <a
                href="/home"
                tw="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/home"
                tw="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Team
              </a>
              <a
                href="/home"
                tw="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </a>
              <a
                href="/home"
                tw="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Calendar
              </a>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={signOut}
            tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-400"
          >
            <Link to="/">Sign out</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
