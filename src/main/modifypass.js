import{BrowserWindow, ipcMain } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let passWind
function createPassWind(){
    passWind = new BrowserWindow({
        height: 330,
        width: 430,
        frame:false,
        // parent: mainWindow, // win是主窗口
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    })
    passWind.webContents.openDevTools({mode:'detach'});
    passWind.loadURL(winURL + '#/modifypass');
    passWind.setMaximizable(false)
}

ipcMain.on('createModifyWind',()=>{
    createPassWind()
})

ipcMain.on('passMini',()=>{
    passWind.minimize()
})

ipcMain.on('passClose',()=>{
    passWind.close()
})