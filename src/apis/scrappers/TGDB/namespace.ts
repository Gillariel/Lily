import {
  Developer as NDeveloper,
  Game as NGame, 
  Genre as NGenre, 
  Platform as NPlatform, 
  Publisher as NPublisher,
  Others as NOthers
} from './types';

declare namespace TGDBTypes {
  export import Developer = NDeveloper;
  export import Game = NGame;
  export import Genre = NGenre;
  export import Platform = NPlatform;
  export import Publisher = NPublisher;
  export import Others = NOthers;
}
export default TGDBTypes