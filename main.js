const { app, BrowserWindow, Tray } = require("electron");
const path = require("path");
const windowStateKeeper = require("electron-window-state");

let tray;

function createTray() {
  tray = new Tray('Public/assets/icons/game.png');
}

const createWindow = () => {
  createTray();
  let winState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });
  let win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
  });
  winState.manage(win);
  win.once("ready-to-show", win.show);
  win.loadFile("index.html");
  win.on("closed", () => {
    win = null;
  });
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
