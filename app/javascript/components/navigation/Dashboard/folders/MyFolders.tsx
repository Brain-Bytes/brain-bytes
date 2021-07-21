import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

type Props = {
  handleNewFolder: () => void,
}

const MyFolders = (props: Props) => {
  const { handleNewFolder } = props;

  return (
    <div className="flex items-center justify-between mb-4">
      <span>My folders</span>
      <FontAwesomeIcon icon={faPlusSquare} className="cursor-pointer" onClick={handleNewFolder} />
    </div>
  );
};

export default MyFolders;
