import Store from 'electron-store';
import { Settings } from '../types/store';
import yaml from 'js-yaml';

export default new Store<Settings>({
  fileExtension: 'yaml',
	serialize: yaml.safeDump,
  deserialize: yaml.safeLoad,
  encryptionKey: "#Sw3x%C$uryEP3m9j%Pu"
})