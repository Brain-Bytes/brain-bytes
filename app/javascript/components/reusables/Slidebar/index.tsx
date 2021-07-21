import React, { ReactNode } from 'react';
import BackgroundOverlay from './BackgroundOverlay';

type Props = {
  children: ReactNode,
  toggleSlidebar: () => void,
  isSlidebarOpen: boolean,
};

const Slidebar = (props: Props) => {
  const { children, toggleSlidebar, isSlidebarOpen } = props;

  return (
    <>
      <div
        className={`absolute top-0 z-10 w-9/12 h-full p-4 bg-grey-background shadow-slidebar ${isSlidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {children}
      </div>
      <BackgroundOverlay toggleSlidebar={toggleSlidebar} />
    </>
  );
};

export default Slidebar;
