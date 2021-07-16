import React, { useContext } from 'react';
import { AuthContext } from '../utils/authContext';
import MainLayout from '../components/MainLayout';

const dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user.user.firstname);
  return (
    <MainLayout>
      <div className="flex flex-col flex-grow pl-80 pt-20 mb-10 bg-gray-100 h-full">
        <h1 className="text-5xl">dashboard</h1>
      </div>
    </MainLayout>
  );
};

export default dashboard;
