import React, { useState } from 'react';
import { ConfirmIcon, CancelIcon, EditIcon, DeleteIcon } from '../../../reusables/icons/icons';
import FolderNameAndBytes from './helpers/FolderNameAndBytes';
import FolderNameInput from './helpers/FolderNameInput';

type Folder = {
  id: number,
  name: string,
  numberOfBytes: number,
  default: boolean,
};

type Props = {
  folder: Folder,
  handleEditFolder: (id: number, name: string, callback: {isLoading: (newState: boolean) => void, errorMessage: (newState: string) => void}) => void,
  handleDeleteFolder: (id: number, callback: {isLoading: (newState: boolean) => void, errorMessage: (newState: string) => void}) => void,
  openFolderOrSaveByte: (id: number, name: string) => void,
};

const Folder = (props: Props) => {
  const { folder, handleEditFolder, handleDeleteFolder, openFolderOrSaveByte } = props;

  const isDefaultFolder = folder.default;

  const [folderName, setFolderName] = useState(folder.name);
  const [showDeletionPrompt, setShowDeletionPrompt] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [isEditingOrDeleting, setIsEditingOrDeleting] = useState(false);
  const [editingOrDeletingError, setEditingOrDeletingError] = useState('');

  const toggleDeletionPrompt = () => setShowDeletionPrompt(!showDeletionPrompt);
  const toggleEditMode = () => setShowEditMode(!showEditMode);
  const handleIsLoading = (newState: boolean) => setIsEditingOrDeleting(newState);
  const handleError = (newState: string) => setEditingOrDeletingError(newState);
  const removeErrorMessage = () => setEditingOrDeletingError('');

  const updateFolderName = (e: any) => setFolderName(e.target.value);
  const saveNewFolderName = () => {
    toggleEditMode();
    handleEditFolder(folder.id, folderName, {isLoading: handleIsLoading, errorMessage: handleError});
  };

  const removeFolder = () => {
    handleDeleteFolder(folder.id, {isLoading: handleIsLoading, errorMessage: handleError});
  };

  if (isDefaultFolder) {
    return (
      <div className='flex justify-between mb-2 text-sm'>
        <FolderNameAndBytes id={folder.id} name={folder.name} numberOfBytes={folder.numberOfBytes} openFolderOrSaveByte={openFolderOrSaveByte} />
      </div>
    );
  };

  if (editingOrDeletingError) {
    return (
      <div>
        <span>{editingOrDeletingError}</span>
        <CancelIcon onClick={removeErrorMessage} className='ml-2 text-green-dark' />
      </div>
    )
  };

  return (
    <div className='flex justify-between mb-2 text-sm'>
      {showEditMode
        ? (
            <FolderNameInput
              className='bg-grey-background'
              onFocusOut={saveNewFolderName}
              value={folderName}
              onChange={updateFolderName}
            />
        ) : (
          <FolderNameAndBytes id={folder.id} name={folder.name} numberOfBytes={folder.numberOfBytes} openFolderOrSaveByte={openFolderOrSaveByte} />
        )
      }
      {isEditingOrDeleting ? (
        <span className='animate-pulse'>...</span>
      ) : (
        <div>
          {showDeletionPrompt
            ? (
              <>
                <ConfirmIcon onClick={removeFolder} className='ml-2' />
                <CancelIcon onClick={toggleDeletionPrompt} className='ml-2' />
              </>
            ) : (
              <>
                <EditIcon onClick={toggleEditMode} className='ml-2' />
                <DeleteIcon onClick={toggleDeletionPrompt} className='ml-2' />
              </>
            )
          }
        </div>
      )}
    </div>
  )
};

export default Folder;
