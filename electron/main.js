import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development';

// Path configuration
const getAssetsPath = () => {
  return isDev
    ? path.join(__dirname, '../src/assets')
    : path.join(process.resourcesPath, 'assets');
};

// Ensure assets directory exists
const ensureAssetsDir = () => {
  const assetsPath = getAssetsPath();
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }
};

function createWindow() {
  const win = new BrowserWindow({
    width: 615,
    height: 650,
    minWidth: 600,
    minHeight: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.removeMenu();

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(startUrl);

  win.webContents.on('crashed', () => {
    console.error('Renderer process crashed');
    app.quit();
  });
}

// IPC Handlers with proper path handling
ipcMain.handle("fetch-songs", async () => {
  try {
    ensureAssetsDir();
    const assetsPath = getAssetsPath();
    const files = await fs.promises.readdir(assetsPath);
    return files
      .filter(file => path.extname(file).toLowerCase() === '.mp3')
      .map(file => ({
        name: path.basename(file, '.mp3'),
        url: `file://${path.join(assetsPath, file)}`
      }));
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
});

ipcMain.handle("upload-mp3", async (_, filePath) => {
  try {
    ensureAssetsDir();
    const assetsPath = getAssetsPath();
    const fileName = path.basename(filePath);
    const destPath = path.join(assetsPath, fileName);

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(destPath);

    return new Promise((resolve, reject) => {
      readStream.pipe(writeStream)
        .on('finish', () => resolve({
          name: path.basename(fileName, '.mp3'),
          url: `file://${destPath}`
        }))
        .on('error', reject);
    });
  } catch(error) {
    console.error("Error uploading mp3:", error);
    return null;
  }
});
// Add this to your IPC handlers in main.js
ipcMain.handle("delete-song", async (_, filePath) => {
  try {
    await fs.promises.unlink(filePath);
    return true;
  } catch (error) {
    console.error("Error deleting song:", error);
    return false;
  }
});

// App lifecycle
app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''));
    callback(pathname);
  });
  createWindow();
});

app.on('window-all-closed', app.quit);
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('close-app', () => app.quit());
