import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../navigation/Navbar';
import Byte from '../bytes/Byte';

// Services
import { getBytes, deleteByte, toggleLike, getOlderBytes, getBytesFromFolder } from '../services/ByteService';

const Home = () => {
  let history = useHistory();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bytes, setBytes] = useState<any[]>([]);
  const [hasMoreBytesToLoad, setHasMoreBytesToLoad] = useState(true);

  const handleSetBytes = (newState: {}[]) => setBytes(newState);

  useEffect(() => {
    setIsLoading(true);
    getBytes(handleSetBytes)
      .catch(() => setError("Something went wrong. You'd better reload the page!"))
      .finally(() => setIsLoading(false))
  }, []);

  const addOlderBytes = () => {
    const { id: lastByteId} = bytes[bytes.length - 1]
    getOlderBytes(lastByteId, bytes, handleSetBytes, setHasMoreBytesToLoad)
      .catch(() => setError("Something went wrong. You'd better reload the page!"));
  };


  const handleDeleteByte = (byteId: number) => {
    deleteByte(byteId, bytes, handleSetBytes)
      .catch(() => setError("Something went wrong. You'd better reload the page!"));
  };

  const handleLikeByte = (byteId: number) => {
    if (!localStorage.getItem('token')) return history.push('/login');
    const userId = localStorage.getItem('userId');

    toggleLike(byteId, userId, bytes, handleSetBytes)
      .catch(() => setError("Something went wrong. You'd better reload the page!"));
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-full text-white bg-grey-background">
        <div id="scrollableDiv" className="w-full h-full p-8 pb-20 mx-auto overflow-scroll md:w-10/12 lg:w-6/12">
          {error && <p className='text-red-600'>{error}</p>}
          {isLoading ?
            <Spinner animation="border" role="status" className='block p-10 mx-auto mt-10'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          :
            <div>
              <InfiniteScroll
                dataLength={bytes.length}
                next={addOlderBytes}
                hasMore={hasMoreBytesToLoad}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                scrollableTarget="scrollableDiv"
              >
                {bytes.map((byte) => (
                  <Byte
                    key={byte.id}
                    byte={byte}
                    handleLikeByte={handleLikeByte}
                    handleDeleteByte={handleDeleteByte}
                  />
                ))}
              </InfiniteScroll>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
