import { INetworkManager } from "../../network-manager";
import TGDBTypes from "./namespace";
import { formatParam } from "./utils";

class Wrapper {
  private static _instance: Wrapper;
  private _manager: INetworkManager;;
  private constructor(manager: INetworkManager) {
    this._manager = manager;
  }

  readonly byGameID = async (params: {
    id: number, 
    game_s_id: number[] | number, 
    fields?: TGDBTypes.Game.GameFields[] | TGDBTypes.Game.GameFields, 
    include?: TGDBTypes.Game.GameInclude[] | TGDBTypes.Game.GameInclude,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesByGameID>("/v1/Games/ByGameID", formatParam(params));
  }

  readonly byGameNameV1 = async (params: {
    searchName: string,
    fields?: TGDBTypes.Game.GameFields[] | TGDBTypes.Game.GameFields,
    platform_s_id?: number[] | number,
    include?: TGDBTypes.Game.GameInclude[] | TGDBTypes.Game.GameInclude,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesByGameID_v1>("/v1/Games/ByGameName", formatParam(params));
  }

  readonly byGameNameV1_1 = async (params: {
    searchName: string,
    fields?: TGDBTypes.Game.GameFields[] | TGDBTypes.Game.GameFields,
    platform_s_id?: number[] | number,
    include?: TGDBTypes.Game.GameInclude[] | TGDBTypes.Game.GameInclude,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesByGameID>("/v1.1/Games/ByGameName", formatParam(params));
  }

  readonly byPlatformID = async (params: {
    id: number,
    fields?: TGDBTypes.Game.GameFields[] | TGDBTypes.Game.GameFields, 
    include?: TGDBTypes.Game.GameInclude[] | TGDBTypes.Game.GameInclude,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesByGameID>("/v1/Games/ByPlatformID", formatParam(params));
  }

  readonly images = async (params: { 
    games_id: number[] | number,
    filter?: TGDBTypes.Game.GameImageFilter[] | TGDBTypes.Game.GameImageFilter,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesImages>("/v1/Games/Images", formatParam(params));
  }

  readonly updates = async (params: {
    name: string, last_edit_id: number, time?: number, page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Game.GamesUpdates>("/v1/Games/Updates", formatParam(params));
  }

  public static Instance(manager: INetworkManager) {
    return this._instance || new this(manager);
  }
}

const builder = (manager: INetworkManager) => {
  return Wrapper.Instance(manager);
}

export default builder;