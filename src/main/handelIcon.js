import{BrowserWindow, ipcMain } from 'electron'

var mainWind = BrowserWindow.getFocusedWindow()

ipcMain.on('handelClose',()=>{
    mainWind.close()
})
ipcMain.on('handelMini',()=>{
    mainWind.minimize()
})