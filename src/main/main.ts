/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { getGames } from './utils/folder-checker';
import initializeConstants from './utils/initialize-contants';
import libraryGenerator from './ipcs/library-generator';

const ipc = require('electron').ipcMain;

const global = initializeConstants();

let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {
    const dimensions = screen.getPrimaryDisplay().size;
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: dimensions.height,
        width: dimensions.width,
        webPreferences: {
            webSecurity: process.env.NODE_ENV === 'production' ? false : true,
            devTools: process.env.NODE_ENV === 'production' ? false : true
        },
        center: true,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });


    ipc.on('launch-game', (e: Electron.IpcMessageEvent, args: string[]) => {
        console.log(args);
        var emulator = args.find(a => a.includes('emulator'));
        if(emulator && emulator.split("=")[1] === ('rpcs3')) {
            const {shell} = require('electron');
            shell.openItem(`D:/Lily/Emulators/PS3/games/Folklore/start.bat`);
        }
    })

    ipc.on('get-games', (e: Electron.IpcMessageEvent, args: string[]) => {
        e.sender.send('get-games', { games: getGames() });
    })

    libraryGenerator(ipc, global);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
