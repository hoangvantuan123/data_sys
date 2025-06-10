import {
  contextBridge,
  ipcRenderer
} from 'electron';

const api = {

  openRoute: (path) => ipcRenderer.send('open-route-in-new-window', path),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api);
  } catch (error) {
    console.error('❌ Lỗi khi expose Electron API:', error);
  }
} else {
  window.electron = api;
}