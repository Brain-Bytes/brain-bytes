import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Byte = ({ byte, handleLikeByte, handleDeleteByte }) => {
  const isByteAuthor = byte.user.id === localStorage.getItem('userId');

  const showAlertBeforeDeletingByte = () => {
    if (confirm('Are you sure you want to delete this byte?')) {
      handleDeleteByte(byte.id)
    }
  };

  return (
    <div className="px-4 pt-4 mb-10 w-100 bg-grey-dark shadow-light">
      <div className='flex justify-between'>
        <span className="text-xs">posted on {new Date(byte.createdAt).toDateString()} by {byte.user.username}</span>
        { isByteAuthor && (
          <div className='hidden md:block'>
            <FontAwesomeIcon className="mr-2 cursor-pointer" icon={faTrashAlt} onClick={showAlertBeforeDeletingByte} />
          </div>
        )}
      </div>
      <h2 className="my-2 text-xl">{byte.title}</h2>
      <MDEditor.Markdown source={byte.body}  className='break-words' />
      <div className="flex items-center justify-between py-2 mt-2 text-sm border-t border-grey-light">
        <span>
          <FontAwesomeIcon
            className={`mr-2 cursor-pointer ${byte.likedByCurrentUser ? 'text-green-dark' : ''}`}
            icon={faBrain}
            onClick={() => handleLikeByte(byte.id)}
            />
          <span>{byte.likesCount}</span>
        </span>
        <div className='hidden md:block'>
          {byte.tags.map((tag) => (
            <span key={`${tag.name}-${byte.id}`} className="mx-2">#{tag.name}</span>
          ))}
        </div>
      </div>
    </div>
)};

export default Byte;
