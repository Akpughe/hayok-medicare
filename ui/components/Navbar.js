import React, { useContext } from 'react';
import { AuthContext } from '../utils/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full flex bg-white border border-b h-16 p-4">
      <div className="flex flex-row w-full justify-end items-end">
        <div className="flex flex-col">
          <small>logged in as</small>
          <span className="text-base font-semibold">
            {user.user.firstname} {user.user.lastname}
          </span>
        </div>
        <div className="mx-4 cursor-pointer" onClick={logout}>
          <span className="text-base font-semibold">Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
