import { Global } from "../../types/global";

const fs = require('fs');

export const CheckFolderExist = (folderName: string) => {
  return fs.existsSync(folderName);
}

export const CheckEmulatorsExist = (console: string, emulatorsName: string) => {
  return fs.existsSync(__dirname + "/Emulators/" + console + "/" + emulatorsName);
}

export const getGames = (consoleNameParam?: string): { console: string, name: string }[] => {
  var result = [] as { console: string, name: string }[];
  var consoleDirectories = fs.readdirSync(__dirname + "/Emulators");
  consoleDirectories.forEach((consoleDirectory: string) => {
    if(fs.existsSync(consoleDirectory + "/games")) {
      var consoleName = consoleDirectory.split("/").reverse()[0];
      if(consoleNameParam && consoleNameParam == consoleName) {
        var games = fs.readdirSync(consoleDirectory + "/games");
        games.forEach((game: string) => {
          result.push({console: consoleName, name: game });
        });
      } else {
        var games = fs.readdirSync(consoleDirectory + "/games");
        games.forEach((game: string) => {
          result.push({console: consoleName, name: game });
        });
      }
    }
  })
  return result;
}

export const getGamesFromLibrary = (global: Global, consoleNameParam?: string): { console: string, name: string }[] => {
  // global.games.map((games, index) => {

  // });
  console.log(global.games);
  return global.games;
  // PS3: !!seq
  //   - Folklore: !!map
  //       Name: Folklore
  //       Platform: Sony Playstation 3
  //       Developer(s): Game Republic
  //       Publishers(s): Sony Computer Entertainment
  //       ReleaseDate: 2007-10-09
  //       Players: 1
  //       Co-op: No
  //       Description: Folklore, known in Japan as FolksSoul -Ushinawareta Denshō- (FolksSoul -失われた伝承- FōkusuSōru -Ushinawareta Denshō-, "FolksSoul -Lost Folklore-") is an action role-playing video game developed by Game Republic and published by Sony Computer Entertainment. The game is set in Ireland and the Celtic Otherworld of Irish mythology, centering on a young woman named Ellen, and a journalist named Keats, both playable characters who together unravel the mystery that the quaint village of Doolin hides, the mystery that can only be solved by seeking the memories of the dead in the dangerous, Folk-ridden Netherworld.
  //       ESRB Rating: T - Teen
  //       Genre(s): !!seq
}