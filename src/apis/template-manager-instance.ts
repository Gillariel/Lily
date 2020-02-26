import { INetworkManager } from "./network-manager";

class Wrapper {
  private static _instance: Wrapper;
  private _manager;
  private constructor(manager: INetworkManager) {
    this._manager = manager;
  }

  readonly getAll = () => {

  }

  readonly getById = (id: number) => {
    
  }

  public static Instance(manager: INetworkManager) {
    return this._instance || new this(manager);
  }
}

const builder = (manager: INetworkManager) => {
  return Wrapper.Instance(manager);
}

export default builder;