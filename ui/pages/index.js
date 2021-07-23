import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from '../utils/authContext';
import { Alert } from 'antd';

const PatientLogin = () => {
  const { login, logout, isLoggingOut, setIsLoggingOut } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggingOut) {
      logout();
      setIsLoggingOut(false);
    }
  }, []);

  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post('http://localhost:4000/api/patient/login', {
        // headers: { 'Content-Type': 'application/json' },
        lastname,
        password,
      })
      .then((res) => {
        setIsSubmitting(false);

        login(res.data, rememberMe);

        console.log('Successful' + res.data);
        <Alert message="Success Tips" type="success" showIcon />;

        return router.push(`/home`);
      }, 3000)
      .catch((err) => {
        console.log(err);
        <Alert message="Error" type="error" showIcon />;
        if (!err.response) {
          alert('failed login');
        } else if (err.response.status === 500) {
          alert('failed login');
        } else {
          alert('failed login');
        }

        setIsSubmitting(false);
      }, 3000);
  };
  return (
    <div className=" flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-lg bg-white p-5 py-10">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Hayok Medicare
          </h1>
          <div></div>
          <h2 className="mt-6 text-center text-xl font-light text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            handleSubmit();
          }}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="staffNumber" className="sr-only">
                Last name
              </label>
              <input
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                defaultChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const StaffLogin = () => {
  const { login, logout, isLoggingOut, setIsLoggingOut, loadUser } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggingOut) {
      logout();
      setIsLoggingOut(false);
    }
  }, []);

  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post('http://localhost:4000/api/worker/login', {
        // headers: { 'Content-Type': 'application/json' },
        lastname,
        password,
      })
      .then((res) => {
        setIsSubmitting(false);

        login(res.data, rememberMe);

        // loadUser();
        console.log('Successful' + res.data);
        <Alert message="Success Tips" type="success" showIcon />;

        return router.push(`/dashboard`);
      }, 3000)
      .catch((err) => {
        console.log(err);
        <Alert message="Error" type="error" showIcon />;
        if (!err.response) {
          alert('failed login');
        } else if (err.response.status === 500) {
          alert('failed login');
        } else {
          alert('failed login');
        }

        setIsSubmitting(false);
      }, 3000);
  };
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-lg bg-white p-5 py-10">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Hayok Medicare (Worker)
          </h1>
          <div></div>
          <h2 className="mt-6 text-center text-xl font-light text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            handleSubmit();
          }}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="staffNumber" className="sr-only">
                Last name
              </label>
              <input
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                defaultChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const [show, setShow] = useState('');

  const handleShow = (str) => {
    setShow(str);
  };
  return (
    <>
      <Head>
        <title>Hayok Medicare</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-between w-2/5 border p-8">
          <div className="flex" onClick={() => handleShow('Staff')}>
            <button className="border rounded bg-indigo-600 px-10 py-4">
              <span className="text-lg text-white font-semibold">Staff</span>
            </button>
          </div>
          <div className="flex" onClick={() => handleShow('Patient')}>
            <button className="border rounded bg-blue-600 px-10 py-4">
              <span className="text-lg text-white font-semibold">Patient</span>
            </button>
          </div>
        </div>
        {show === 'Patient' ? (
          <PatientLogin />
        ) : (
          show === 'Staff' && <StaffLogin />
        )}
      </div>
    </>
  );
}
