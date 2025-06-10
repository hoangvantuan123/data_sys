import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  screen,
  dialog
} from 'electron'
import {
  join
} from 'path'
import {
  electronApp,
  optimizer,
  is
} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import path from 'path'

app.disableHardwareAcceleration();

let width, height;
let mainWindow;


function getCursorAdjustedPosition(windowWidth, windowHeight) {
  const cursorPoint = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(cursorPoint);

  const adjustedX = Math.min(cursorPoint.x, display.workArea.x + display.workArea.width - windowWidth);
  const adjustedY = Math.min(cursorPoint.y, display.workArea.y + display.workArea.height - windowHeight);

  return { x: adjustedX, y: adjustedY };
}

function createWindow() {
  const windowWidth = width - 100;
  const windowHeight = height - 40;
  const position = getCursorAdjustedPosition(windowWidth, windowHeight);

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: position.x,
    y: position.y,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {
      icon
    } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }
}

function openRouteInNewWindow(routePath) {
  const windowWidth = width - 150;
  const windowHeight = height - 80;
  const position = getCursorAdjustedPosition(windowWidth, windowHeight);

  const newWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: position.x,
    y: position.y,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newWindow.loadURL(`http://localhost:5173${routePath}`);
  } else {
    newWindow.loadURL(`http://localhost:5173${routePath}`);
  }
}

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const workAreaSize = primaryDisplay.workAreaSize;
  width = workAreaSize.width;
  height = workAreaSize.height;

  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  ipcMain.on('open-route-in-new-window', (event, routePath) => {
    openRouteInNewWindow(routePath);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});