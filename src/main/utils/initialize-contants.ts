import * as fs  from 'fs'
import { safeLoad } from 'js-yaml'
import { Global } from '../../types/global';

const initializeConstants = (): Global => {
  const global: Global = { games: [], consoles: [] };
  try {
    const _consoles = safeLoad(fs.readFileSync(`${__dirname}/config/consoles.yml`, 'utf8').toString());
    Object.defineProperty(global, 'games', {
      get() { return _consoles }
    })
  } catch (err) { console.log(err) }
  try {
    const _games = safeLoad(fs.readFileSync(`${__dirname}/config/games.yml`, 'utf8').toString());
    Object.defineProperty(global, 'consoles', {
      get() { return _games }
    })
  } catch (err) { console.log(err) }
  return global;
}

export default initializeConstants