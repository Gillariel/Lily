import Axios, { AxiosInstance, AxiosError, AxiosPromise } from 'axios'
import { KeyValue } from '../types';

export enum NetworkManagerType {
  TGDB = 0,
}

export interface INetworkManager {
  get: <T>(endpoint: string, specificParams?: Array<Array<string>>, customHeaders?: Array<Array<string>>) => Promise<T | Object>;
  post: <T>(endpoint: string, body: Object, customHeaders?: Array<Array<string>>) => Promise<T | Object>;
  put: <T>(endpoint: string, body: Object, customHeaders?: Array<Array<string>>) => Promise<T | Object>;
  delete: <T>(endpoint: string, customHeaders?: Array<Array<string>>) => Promise<T | Object>;

  addRequestToQueue: (request: AxiosPromise, id: string) => NetworkManager;
  deleteRequestToQueue: (id: string) => NetworkManager;
  executeQueue: () => Promise<Array<Object>>;
}

export type NetworkManagerConfig = {
  host: string,
  headers?: Array<Array<string>>;
  params?: Array<Array<string>>;
  maxRedirects?: number;
}

class NetworkManager implements INetworkManager {
  private static _instances: Array<KeyValue<NetworkManagerType, NetworkManager>> = new Array();
  private _axiosInstance: AxiosInstance;
  private _requestsQueue: Array<KeyValue<string, AxiosPromise>> = new Array();
  private _instanceName: string;
  private _params: Array<Array<string>> = new Array(new Array());

  private constructor(config: NetworkManagerConfig, instanceName: string) {
    this._instanceName = instanceName;
    this._axiosInstance = Axios.create({
      baseURL: config.host,
      headers: config.headers ? config.headers : {},
      maxRedirects: config.maxRedirects ? config.maxRedirects : 10,
      //params: config.params ? config.params : {}
    });
    if(config.params)
      this._params = config.params;
    this._requestsQueue = new Array();
  }

  private appendConstantGetParams = (endpoint: string, otherThanGlobal?: Array<Array<string>>): string => {
    return !otherThanGlobal
     ? endpoint + "?" + this._params.map(((getParam, index) => getParam[0] + "=" + getParam[1] + (index === this._params.length - 1 ? "" : "&")))
     : endpoint + otherThanGlobal.map(((param, index) => ((endpoint[endpoint.length - 1] == "&" ? "" : "&") + param[0] + "=" + param[1] + (index === otherThanGlobal.length - 1 ? "" : "&"))))
  }

  get = async <T = Object>(endpoint: string, specificParams?: Array<Array<string>>, customHeaders?: Array<Array<string>>): Promise<T | Object> => {
    var constructEndpoint = specificParams
      ? this.appendConstantGetParams(this.appendConstantGetParams(endpoint), specificParams)
      : this.appendConstantGetParams(endpoint)
    console.log(constructEndpoint);
    return await this._axiosInstance.get<T>(constructEndpoint, {
      //params: specificParams ? specificParams : {},
      headers: customHeaders ? customHeaders : {}
    })
  }

  post = async <T = Object>(endpoint: string, body: Object, customHeaders?: Array<Array<string>>): Promise<T | Object> => {
    return this._axiosInstance.post<T>(this.appendConstantGetParams(endpoint), body, {
      headers: customHeaders ? customHeaders : {}
    })
  }

  put = async <T>(endpoint: string, body: Object, customHeaders?: Array<Array<string>>) => {
    return this._axiosInstance.put<T>(this.appendConstantGetParams(endpoint), body, {
      headers: customHeaders ? customHeaders : {}
    })
  }

  delete = async <T>(endpoint: string, customHeaders?: Array<Array<string>>) => {
    return this._axiosInstance.delete<T>(this.appendConstantGetParams(endpoint), {
      headers: customHeaders ? customHeaders : {}
    })
  }

  /** @description Not ready for now, do not use.*/
  addRequestToQueue = (request: AxiosPromise, id: string) => {
    this._requestsQueue.push({ key: id, value: request });
    return this;
  };

  /** @description Not ready for now, do not use.*/
  deleteRequestToQueue = (id: string) => {
    var requestIndex = this._requestsQueue.findIndex(r => r.key == id);
    if(requestIndex > -1) {
      this._requestsQueue.splice(requestIndex, 1);
    }
    return this;
  }

  /** @description Not ready for now, do not use.*/
  executeQueue = async (): Promise<Array<Object>> => {
    //try {
      const result = await Promise.all(this._requestsQueue.map((kv => kv.value)));
      return result;
    /*} catch(err) {
      console.log("error during batch requests for NetworkManager '"+ this._instanceName + "'");
    }*/
  };

  public static Instance(config: NetworkManagerConfig, type: NetworkManagerType)
  {
    var instanceOf = this._instances.findIndex(i => i.key === type);
    if(instanceOf > -1){
      return this._instances[instanceOf].value;
    } else {
      var instance = new this(config, NetworkManagerType[type])
      this._instances.push({ key: type, value: instance });
      return instance;
    }
  }
}

const NetworkManagerBuilder = (config: NetworkManagerConfig, type: NetworkManagerType): NetworkManager => {
  return NetworkManager.Instance(config, type);
}

export default NetworkManagerBuilder