import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/authContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  user.user.department ? console.log('worker') : console.log('patient');
  const router = useRouter();
  return (
    <nav className="bg-white h-screen border border-r w-72 fixed pt-16 ">
      <div className="p-7">
        <div className="flex flex-col space-y-4">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href={user.user.department ? `/dashboard` : `/home`}>
            <a
              className={
                router.pathname === `/dashboard` || `/home`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`
              }
            >
              {user.user.department ? `Dashboard` : `Home`}
            </a>
          </Link>
          <Link href={user.user.department ? `/patient` : `#`}>
            <a
              className={
                router.pathname === `/patient`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`
              }
            >
              {' '}
              {user.user.department ? `View Patient` : ``}
            </a>
          </Link>

          <Link href={user.user.department ? `/register` : `#`}>
            <a
              className={
                router.pathname === `/register`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`
              }
            >
              {' '}
              {user.user.department ? `Add Patient` : ``}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
