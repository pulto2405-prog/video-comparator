const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "Video Comparator",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: false
  });

  // Wir laden immer die gebaute Datei, um "weiße Fenster" zu vermeiden
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  mainWindow.loadFile(indexPath);

  mainWindow.webContents.on('context-menu', (e, props) => {
    const menu = Menu.buildFromTemplate([
      { role: 'copy', label: 'Kopieren' },
      { role: 'paste', label: 'Einfügen' },
      { type: 'separator' },
      { role: 'reload', label: 'Neu laden' },
      { role: 'toggleDevTools', label: 'Entwicklerwerkzeuge' }
    ]);
    menu.popup(mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
