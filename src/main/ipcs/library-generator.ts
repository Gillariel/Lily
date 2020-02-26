import { IpcMain, IpcMainEvent } from "electron";
import { Global } from "../../types/global";
import TGDB from "../../apis/scrappers/TGDB";
import * as TGDBTypes from '../../apis/scrappers/TGDB/types'
import { safeDump } from 'js-yaml'
import Axios, { AxiosResponse } from "axios";

const fs = require('fs');

const libraryGenerator = (ipc: IpcMain, global: Global) => {
  ipc.on('generate-library', async (e: IpcMainEvent, args: any) => {
    buildPlatformLibrary(ipc, e);
    buildGamesLibraryForPlatform(ipc, e, 2)
  })
}

const buildPlatformLibrary = async (ipc: IpcMain, e: IpcMainEvent) => {
  const platformsAPI = await TGDB.Platforms.getAll() as AxiosResponse<TGDBTypes.Platform.Platforms>;
  if (platformsAPI.status == 200 && Number(String(platformsAPI.data.code).charAt(0)) === 2) {
    var platforms = platformsAPI.data.data.platforms;
    var platformToSaved = Object.keys(platforms).map(id => {
      return platforms[Number(id)];
    });
    try {
      var ymlPlatforms = safeDump(platformToSaved);
      if (!fs.existsSync(__dirname + "/library/platforms.yml")) {
        fs.mkdir(__dirname + "/library", { recursive: true }, (err) => {
          if (err) {
            e.sender.send("log-result", err);
            throw err;
          }
        });
      }
      fs.writeFile(__dirname + "/library/platforms.yml", ymlPlatforms, {}, () => {
        e.sender.send("log-result", "save platforms to file: " + __dirname + "/library/platforms.yml")
      });
    } catch (err) {
      console.log(err);
      e.sender.send("log-result", platformsAPI)
    }
  } else {
    e.sender.send("log-result", platformsAPI)
    throw new Error('Status code not in 200 range');
  }
}

const buildGamesLibraryForPlatform = async (ipc: IpcMain, e: IpcMainEvent, platformId: number) => {
  const getPageGame = async (ipc, recursive?: { pageEndpoint: string, currentData: TGDBTypes.Game.Game[] }): Promise<TGDBTypes.Game.Game[]> => {
    if (!recursive) {
      const gamesAPI = await TGDB.Games.byPlatformID({ id: 2 }) as AxiosResponse<TGDBTypes.Game.GamesByGameID>;
      if (gamesAPI.status == 200 && Number(String(gamesAPI.data.code).charAt(0)) === 2) {
        var games = gamesAPI.data.data.games;
        var gamesToSaved = Object.keys(games).map(id => {
          return games[Number(id)];
        });
        return gamesAPI.data.pages.next
          ? getPageGame(ipc, { pageEndpoint: gamesAPI.data.pages.next, currentData: gamesToSaved })
          : gamesToSaved
      } else {
        e.sender.send("log-result", gamesAPI)
        //throw new Error('Status code not in 200 range');
        return new Array();
      }
    } else {
      const gamesAPI = await Axios.get(recursive.pageEndpoint) as AxiosResponse<TGDBTypes.Game.GamesByGameID>;
      if (gamesAPI.status == 200 && Number(String(gamesAPI.data.code).charAt(0)) === 2) {
        var games = gamesAPI.data.data.games;
        var gamesToSaved = Object.keys(games).map(id => {
          return games[Number(id)];
        });
        gamesToSaved = [...recursive.currentData, ...gamesToSaved]
        return gamesAPI.data.pages.next
          ? getPageGame(ipc, { pageEndpoint: gamesAPI.data.pages.next, currentData: gamesToSaved })
          : gamesToSaved
      } else {
        e.sender.send("log-result", gamesAPI)
        //throw new Error('Status code not in 200 range');
        return new Array();
      }
    }
  };
  var platformName = getPlatformNameById(platformId);
  const gamesToSaved = await getPageGame(ipc);
  try {
    var ymlGames = safeDump(gamesToSaved);
    if (!fs.existsSync(__dirname + "/library/games")) {
      fs.mkdir(__dirname + "/library/games", { recursive: true }, (err) => {
        if (err) {
          e.sender.send("log-result", err);
          throw err;
        }
      });
    }
    fs.writeFile(__dirname + "/library/games/" + platformName + ".yml", ymlGames, {}, () => {
      e.sender.send("log-result", "save games for " + platformName + " to file: " + __dirname + "/library/games/" + platformName + ".yml")
    });
  } catch (err) {
    console.log(err);
    e.sender.send("log-result", gamesToSaved)
  }
}

const getPlatformNameById = (platformId: number): string => {
  return "Gamecube";
}

export default libraryGenerator