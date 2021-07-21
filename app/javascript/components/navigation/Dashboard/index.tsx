import React, { useEffect, useState } from 'react';
import { CancelIcon } from '../../reusables/icons/icons';
import MyFolders from './folders/MyFolders';
import Folder from './folders/Folder';

import { getFolders, addFolder, editFolder, deleteFolder, addOrRemoveByteFromFolder } from '../../services/FolderService';

type Props = {
  openFolder: (id: number, name: string) => void,
  byteSavingMode: {isActive: boolean, byteId: any},
  handleSaveByteInFolder: (id: number, name: string, callback: any) => void,
};

type FolderType = {
  id: number,
  name: string,
  numberOfBytes: number,
  default: boolean,
};

const Dashboard = (props: Props) => {
  const { openFolder, byteSavingMode, handleSaveByteInFolder } = props;

  const [folders, setFolders] = useState<FolderType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState('')
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
  const [newFolderError, setNewFolderError] = useState('');

  useEffect(() => {
    setIsFetching(true);
    const userId = localStorage.getItem('userId');

    getFolders(userId)
      .then((res: FolderType[]) => setFolders(res))
      .catch(() => setFetchingError('Hmm, we could not load your folders.'))
      .finally(() => setIsFetching(false))
  }, []);

  const removeNewFolderError = () => setNewFolderError('');

  const handleNewFolder = () => {
    setIsCreatingNewFolder(true);

    addFolder()
    .then((res: FolderType) => {
      if (!res) throw Error;
      const copyFolders = [...folders];
      copyFolders.push(res);
      setFolders(copyFolders);
    })
    .catch(() => setNewFolderError('Something went wrong.'))
    .finally(() => setIsCreatingNewFolder(false))
  };

  const handleEditFolder = (
    id: number, name: string, callback: {isLoading: (newState: boolean) => void, errorMessage: (newState: string) => void}
  ) => {
    callback.isLoading(true)
    editFolder(id, name)
      .then((res: FolderType) => {
        const copyFolders = [...folders];
        const index = copyFolders.findIndex((folder) => folder.id === id);
        copyFolders[index].name = res.name;
        setFolders(copyFolders);
      })
      .catch(() => callback.errorMessage('Something went wrong.'))
      .finally(() => callback.isLoading(false))
  };

  const handleDeleteFolder = (
    id: number, callback: {isLoading: (newState: boolean) => void, errorMessage: (newState: string) => void}
  ) => {
    callback.isLoading(true)
    deleteFolder(id)
      .then((res: FolderType) => {
        const copyFolders = [...folders];
        const index = copyFolders.findIndex((folder) => folder.id === res.id);
        copyFolders.splice(index, 1);
        setFolders(copyFolders);
      })
      .catch(() => callback.errorMessage('Something went wrong.'))
      .finally(() => callback.isLoading(false))
  };

  const handleAddOrRemoveByteFromFolder = (folderId: number, byteId: number) => {
    addOrRemoveByteFromFolder(folderId, byteId)
      .then((res: FolderType) => {
        const copyFolders = [...folders];
        const index = copyFolders.findIndex((folder) => folder.id === folderId);
        copyFolders[index].numberOfBytes = res.numberOfBytes;
        setFolders(copyFolders);
      })
      .catch(() => {})
      .finally(() => {})
  };

  const openFolderOrSaveByte = (id: number, name: string) => {
    byteSavingMode.isActive
      ? handleSaveByteInFolder(id, name, handleAddOrRemoveByteFromFolder)
      : openFolder(id, name)
  };

  return (
    <div>
      <MyFolders handleNewFolder={handleNewFolder} />
      {fetchingError
        ? <span className='text-red-400'>{fetchingError}</span>
        :
          isFetching
            ? <span className='animate-pulse'>Loading ...</span>
            : <>{folders.map((folder) => (
              <Folder
                key={folder.id}
                folder={folder}
                handleEditFolder={handleEditFolder}
                handleDeleteFolder={handleDeleteFolder}
                openFolderOrSaveByte={openFolderOrSaveByte}
              />
            ))}</>
      }
      {newFolderError ? (
        <div className='flex text-sm align-items-center'>
          <span className='text-red-400 '>{newFolderError}</span>
          <CancelIcon onClick={removeNewFolderError} className='ml-2' />
        </div>
      ) : isCreatingNewFolder && (
          <div className='text-sm animate-pulse text-green-dark'>Creating folder ...</div>
        )}
    </div>
  )
};

export default Dashboard;
