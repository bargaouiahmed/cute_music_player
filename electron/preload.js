// preload.js
// This should be a separate file referenced in webPreferences.preload

// First check if document exists before manipulating
if (document) {
  // Create style element first
  const style = document.createElement('style');
  style.textContent = `
    * {
      overflow: hidden !important;
      overscroll-behavior: none !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    html, body {
      position: fixed !important;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      touch-action: none !important;
      -webkit-user-select: none;
      user-select: none;
    }
  `;

  // Wait for document head to be available
  const insertStyles = () => {
    if (document.head) {
      document.head.appendChild(style);
      document.removeEventListener('DOMContentLoaded', insertStyles);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertStyles);
  } else {
    insertStyles();
  }
}

// Electron context bridge
try {
  const { contextBridge, ipcRenderer } = require('electron');

  contextBridge.exposeInMainWorld('electron', {
    closeApp: () => ipcRenderer.send('close-app'),
    fetchAllSongs: () => ipcRenderer.invoke('fetch-songs'),
    uploadSong: async (filePath) => {
      return ipcRenderer.invoke('upload-mp3', filePath);
    },
    deleteSong: (filePath) => ipcRenderer.invoke("delete-song", filePath),

      // ... other exports
      getFileUrl: (path) => ipcRenderer.invoke('get-file-url', path),
      downloadFile: async (url ,fileName)=>{
        return await ipcRenderer.invoke('download-mp3', {url, fileName});
      }
    });  ;
} catch (error) {
  console.error('Electron context bridge failed:', error);
}

// Scroll prevention
document.addEventListener('DOMContentLoaded', () => {
  const blockScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  ['wheel', 'touchmove', 'scroll'].forEach((event) => {
    window.addEventListener(event, blockScroll, { passive: false });
    document.addEventListener(event, blockScroll, { passive: false });
  });
});
