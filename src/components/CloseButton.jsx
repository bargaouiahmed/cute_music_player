import React, { useEffect, useState } from 'react';

const CloseButton = () => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(typeof window.electron?.closeApp === 'function');
  }, []);

  const handleClose = () => {
    if (isElectron) {
      window.electron.closeApp();
    } else {
      console.log('App close requested - would quit in Electron');
      window.close();
    }
  };

  return (
    <button
      onClick={handleClose}
      className="fixed top-4 right-4 z-50 text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer text-2xl transition-all duration-200 hover:scale-110"
      style={{
        WebkitAppRegion: 'no-drag',
        pointerEvents: 'auto',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        background:"none",
        zoom:"2",
        border:"none",
        position:"absolute"
      }}
      title="Close Application"
    >
      ✕
    </button>
  );
};

export default CloseButton;
