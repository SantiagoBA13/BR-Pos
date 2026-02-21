import { app, BrowserWindow } from "electron";
import path from "path";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({ width: 1200, height: 750 });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "..", "dist-renderer", "index.html"));
  }
}

function setupUpdates() {
  if (!app.isPackaged) return;

  autoUpdater.logger = log;
  (autoUpdater.logger as any).transports.file.level = "info";
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(() => {
  createWindow();
  setupUpdates();
});