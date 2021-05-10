const { app, BrowserWindow } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state')

function createWindow () {

  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 800, defaultHeight: 600
  })

  const win = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 800, minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })

  win.loadFile('renderer/main.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})