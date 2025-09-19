# Electron Configuration for VPN Status App

To compile this app with Electron, create these files in your project root:

## main.js
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 135,
    autoHideMenuBar: true,
    resizable: false,
    maximizable: false,
    minimizable: true,
    alwaysOnTop: true,
    title: 'VPN Status',
    icon: path.join(__dirname, 'icon.png'), // Add your icon
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    }
  });

  // Load the built React app
  win.loadFile(path.join(__dirname, 'dist/index.html'));
  
  // Remove default menu
  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

## Build Steps
1. Run `npm run build` to build the React app
2. Install electron: `npm install electron --save-dev`
3. Add to package.json scripts:
   ```json
   {
     "electron": "electron .",
     "electron-dev": "ELECTRON_IS_DEV=1 electron .",
     "dist": "electron-builder"
   }
   ```
4. Run `npm run electron` to start the Electron app

## For Distribution
Install electron-builder: `npm install electron-builder --save-dev`

Add to package.json:
```json
{
  "main": "main.js",
  "build": {
    "appId": "com.vpnstatus.app",
    "productName": "VPN Status",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "main.js",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    }
  }
}
```

Then run `npm run dist` to create the .exe file.