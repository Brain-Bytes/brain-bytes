import React from 'react';

type Props = {
  className: string,
  onFocusOut: () => void,
  value: string,
  onChange: (e: any) => void,
};

const FolderNameInput = (props: Props) => {
  const { className, onFocusOut, value, onChange } = props;

  return (
    <input
      autoFocus
      className={className}
      onBlur={onFocusOut}
      value={value}
      onChange={onChange}
    />
  );
};

export default FolderNameInput;
