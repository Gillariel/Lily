import { INetworkManager } from "../../network-manager";
import TGDBTypes from "./namespace";

class Wrapper {
  private static _instance: Wrapper;
  private _manager: INetworkManager;;
  private constructor(manager: INetworkManager) {
    this._manager = manager;
  }

  readonly getAll = async () => {
    return await this._manager.get<TGDBTypes.Genre.Genres>("/v1/Genres");
  }

  public static Instance(manager: INetworkManager) {
    return this._instance || new this(manager);
  }
}

const builder = (manager: INetworkManager) => {
  return Wrapper.Instance(manager);
}

export default builder;