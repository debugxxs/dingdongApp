import{BrowserWindow, ipcMain } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let setWind
function createSetWind(){
     setWind = new BrowserWindow({
        height: 330,
        width: 430,
        frame:false,
        // parent: mainWindow, // win是主窗口
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    })
    setWind.webContents.openDevTools({mode:'detach'});
    setWind.loadURL(winURL + '#/setwind');
    setWind.setMaximizable(false)
}

ipcMain.on('createSetWind',()=>{
    createSetWind()
})

ipcMain.on('setMini',()=>{
    setWind.minimize()
})

ipcMain.on('setClose',()=>{
    setWind.close()
})