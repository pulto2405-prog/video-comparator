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

  const isDev = !app.isPackaged;
  
  if (isDev) {
    // Falls wir im Dev-Modus sind, laden wir vom Vite-Server
    mainWindow.loadURL('http://localhost:5173');
  } else {
    // In der Standalone-Version laden wir die gebaute index.html
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Rechtsklick-Menü
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
