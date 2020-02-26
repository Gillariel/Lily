import { INetworkManager } from "../../network-manager";
import TGDBTypes from "./namespace";

class Wrapper {
  private static _instance: Wrapper;
  private _manager: INetworkManager;
  private constructor(manager: INetworkManager) {
    this._manager = manager;
  }

  readonly getAll = async (params?: {
    fields: TGDBTypes.Platform.PlatformFields
  }) => {
    return await this._manager.get<TGDBTypes.Platform.Platforms>("/v1/Platforms");
  }

  readonly byPlatformId = async (params: {
    id: number,
    fields?: TGDBTypes.Platform.PlatformFields
  }) => {
    return await this._manager.get<TGDBTypes.Platform.PlatformsByPlatformID>("/v1/Platforms/ByPlatformID");
  }

  readonly byPlatformName = async (params: {
    name: string,
    fields?: TGDBTypes.Platform.PlatformFields
  }) => {
    return await this._manager.get<TGDBTypes.Platform.PlatformsByPlatformName>("/v1/Platforms/ByPlatformName");
  }

  readonly images = async (params: {
    platforms_id: number[] | number,
    filter?: TGDBTypes.Platform.PlatformImageFilter,
    page?: number
  }) => {
    return await this._manager.get<TGDBTypes.Platform.PlatformsImages>("/v1/Platforms/Images");
  }

  public static Instance(manager: INetworkManager) {
    return this._instance || new this(manager);
  }
}

const builder = (manager: INetworkManager) => {
  return Wrapper.Instance(manager);
}

export default builder;