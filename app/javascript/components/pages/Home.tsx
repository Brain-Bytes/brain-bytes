import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../navigation/Navbar';
import Byte from '../bytes/Byte';
import { CancelIcon } from '../reusables/icons/icons';

// Services
import { getBytes, deleteByte, toggleLike, getOlderBytes, getBytesFromFolder } from '../services/ByteService';

const Home = () => {
  let history = useHistory();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [byteSavingMode, setByteSavingMode] = useState({
    isActive: false,
    byteId: null,
  });
  const [bytes, setBytes] = useState<any[]>([]);
  const [hasMoreBytesToLoad, setHasMoreBytesToLoad] = useState(true);
  const [openedFolder, setOpenedFolder] = useState('');
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => setIsSlidebarOpen(!isSlidebarOpen);

  useEffect(() => {
    setIsLoading(true);
    getBytes()
      .then((res) => {
        const bytes = res.data.data.fetchBytes
        setBytes(bytes);
      })
      .catch(() => setError('Server error'))
      .finally(() => setIsLoading(false))
  }, []);

  const addOlderBytes = () => {
    const lastByte = bytes[bytes.length - 1]
    const lastByteId = lastByte.id;
    getOlderBytes(lastByteId)
      .then((res) => {
        const olderBytes = res.data.data.fetchOlderBytes;
        if (olderBytes.length === 0) return setHasMoreBytesToLoad(false);

        const copyBytes = [...bytes];
        setBytes([...copyBytes, ...olderBytes]);
      })
      .catch((error) => console.log('error', error))
  };

  const handleSetBytes = (newState: any) => setBytes(newState);

  const handleDeleteByte = (byteId: number) => {
    deleteByte(byteId)
      .then(
        (res) => {
          const byteId = parseInt(res.data.data.deleteByte.byte.id);
          const copyBytes = [...bytes];
          const index = copyBytes.findIndex((byte) => parseInt(byte.id, 10) === byteId);
          copyBytes.splice(index, 1);
          setBytes(copyBytes);
        },
        (error) => console.log('error', error),
      )
  };

  const handleLikeByte = (byteId: number) => {
    if (!localStorage.getItem('token')) return history.push('/login');

    toggleLike(byteId, localStorage.getItem('userId'))
      .then((response) => {
        const likedByte = response.data.data.toggleLike.byte;
        const copyBytes = [...bytes];
        const index = copyBytes.findIndex((_byte) => _byte.id === likedByte.id);
        copyBytes[index].likesCount = likedByte.likesCount;
        copyBytes[index].likedByCurrentUser = likedByte.likedByCurrentUser;
        handleSetBytes(copyBytes);
      })
      .catch((error) => console.log('error', error));
  };


  const openFolder = (id: number, name: string) => {
    if (window.innerWidth < 768) toggleSlidebar();
    if (openedFolder) setOpenedFolder('');
    setIsLoading(true);

    getBytesFromFolder(id)
      .then((res) => {
        const bytes = res.data.data.fetchBytes.slice(0,2);
        setBytes(bytes);
        setOpenedFolder(name);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  };

  const closeFolder = () => {
    setOpenedFolder('');
    setIsLoading(true);
    getBytes()
      .then((res) => {
        const bytes = res.data.data.fetchBytes
        setBytes(bytes);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
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
              {openedFolder && (
                <div className='inline-block px-2 mb-4 border-2 rounded border-green-light'>
                  <span>{openedFolder}</span>
                  <CancelIcon onClick={closeFolder} className='ml-2' />
                </div>
              )}
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
