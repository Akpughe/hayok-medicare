import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white h-screen border border-r w-72 fixed pt-16 ">
      <div className="p-7">
        <div className="flex flex-col space-y-4">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href="/dashboard">
            <a
              className={
                (router.pathname === `/dashboard`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`)
              }
            >
              Dashboard
            </a>
          </Link>
          <Link href="/patient">
            <a
              className={
                (router.pathname === `/patient`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`)
              }
            >
              {' '}
              View Patients
            </a>
          </Link>

          <Link href="/register">
            <a
              className={
                (router.pathname === `/register`
                  ? `text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 px-5 py-4 text-sm font-medium`)
              }
            >
              {' '}
              Add Patient
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
