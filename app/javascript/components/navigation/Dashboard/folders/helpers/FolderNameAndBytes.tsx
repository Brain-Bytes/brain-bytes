import React from 'react';

type Props = {
  id: number,
  name: string,
  numberOfBytes: number,
  openFolderOrSaveByte: (id: number, name: string) => void,
};

const FolderNameAndBytes = (props: Props) => {
  const { id, name, numberOfBytes, openFolderOrSaveByte } = props;

  const handleOpenFolderOrSaveByte = () => {
    openFolderOrSaveByte(id, name);
  };

  return (
    <div className='cursor-pointer' onClick={handleOpenFolderOrSaveByte}>
      <span className='mr-2'>{name}</span>
      <span className='text-green-dark'>({numberOfBytes})</span>
    </div>
  );
};

export default FolderNameAndBytes;
