import React from 'react';

type Props = {
  toggleSlidebar: () => void,
};

const BackgroundOverlay = (props: Props) => {
  const { toggleSlidebar } = props;

  return (
    <div
      onClick={toggleSlidebar}
      className="absolute top-0 w-full h-full bg-black bg-opacity-50"
    />
  )
};

export default BackgroundOverlay;
