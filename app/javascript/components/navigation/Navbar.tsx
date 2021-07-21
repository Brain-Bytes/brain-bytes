import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBrain } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from "react-router-dom";
import Button from '../reusables/Button';

const Navbar = (props: any) => {
  const { toggleSlidebar } = props;

  let history =  useHistory();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) setUserLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    history.push('/');
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 border-b bg-grey-medium border-grey-light">
        <div className="flex items-center">
          <Link to="/" className="no-underline">
            <h1 className="text-lg font-light text-white no-underline cursor-pointer md:text-2xl">Brain Bytes</h1>
          </Link>
        </div>
        <Link to={userLoggedIn ? "/new-byte" : '/login'}>
          <div className="px-2 py-1 text-white rounded cursor-pointer bg-green-light active:bg-green-dark shadow-light d-none d-md-block">
            <FontAwesomeIcon className="mr-2" icon={faBrain} />
            <span>Add Byte</span>
          </div>
        </Link>
        <div>
          {userLoggedIn ? (
            <>
              <Button className="mx-2 text-white cursor-pointer" text="Log out" action={handleLogout} />
              <span
                className="px-2 py-1 mx-2 text-white border rounded cursor-pointer border-grey-light"
                onClick={() => alert('Coming soon!')}
              >
                Profile
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className='no-underline'>
                <span className="mx-2 text-white cursor-pointer">Log in</span>
              </Link>
              <Link to="/signup" className='no-underline'>
                <span className="px-2 py-1 mx-2 text-white border rounded cursor-pointer border-grey-light">Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
