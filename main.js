const path = require('path');
const { app, BrowserWindow } = require('electron');

if (process.env.RELOAD) {
  const path = require('path');
  const reload = require('electron-reload');
  reload(path.join(__dirname, 'dist'), {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

let mainWindow;
const indexPath = path.resolve(__dirname, './dist/index.html');

const createWindow = () => {
  // let { x, y, height, width, manage } = windowStateKeeper({
  //   defaultWidth: 1000, defaultHeight: 800,
  // });

  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    minHeight: 640,
    minWidth: 480,
    webPreferences: { nodeIntegration: true },
    title: 'conductor',
    backgroundColor: '#eee',
  });

  mainWindow.setAspectRatio(4/3);
  mainWindow.loadFile(indexPath);
  mainWindow.on('closed', () => { mainWindow = null; });
  mainWindow.webContents.openDevTools()
};


app.on('ready', createWindow);

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

app.on('activate', () => mainWindow === null && createWindow());