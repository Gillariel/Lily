import { IpcMain } from "electron";
import { types } from "util";
import { Global } from "../../types/global";

const libraryGenerator = (ipc: IpcMain, global: Global) => {
  const games = global.games;
  const consoleList = global.consoles;
  /*games.forEach((game: any) => {
    switch(game.console) {
      case 'PS3': {
        break;
      }
      case 'Xbox 360': {
        break;
      }
      default: {
        break;
      }
    }
  })*/
}

export default libraryGenerator