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