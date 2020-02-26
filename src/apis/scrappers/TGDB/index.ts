import Platforms from './platforms';
import Games from './games';
import Genres from './genres';
import Developers from './developers';
import Publishers from './publishers';
import NetworkManagerBuilder, { NetworkManagerType } from '../../network-manager';

import Store from '../../../stores/credentials';

const api_key = Store.get("TGDB_KEY");
const manager = NetworkManagerBuilder({
  host: "https://api.thegamesdb.net",
  params: [
    [ "apikey", api_key ]
  ], 
  headers: [
    ["accept", "application/json" ],
    ["content-type", "application/json" ],
  ]
}, NetworkManagerType.TGDB)

export default {
  Platforms: Platforms(manager), 
  Games: Games(manager), 
  Genres: Genres(manager), 
  Developers: Developers(manager), 
  Publishers: Publishers(manager)
}