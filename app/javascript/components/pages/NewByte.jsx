import React from 'react';
import Navbar from '../navigation/Navbar';
import Dashboard from '../navigation/Dashboard';
import InfoPanel from '../navigation/InfoPanel';

import ByteForm from '../bytes/ByteForm';

const NewByte = () => {

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-full bg-grey-background">
        <ByteForm />
      </div>
    </div>
  )
};

export default NewByte;
