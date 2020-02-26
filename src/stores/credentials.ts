import * as Store from 'electron-store';
import { Credentials } from '../types/store';
import { safeDump, safeLoad } from 'js-yaml';
import fs from 'fs'
import { KeyValue } from '../types';
const store = new Store<Credentials>({
  name: "crendentials",
  fileExtension: 'yaml',
	serialize: safeDump,
  deserialize: safeLoad,
  encryptionKey: "LGhxG*6f%*L5R#!wK5KBWydraMD7EQEd35WfwMyQo9S$#UuoVSwCvKkJQhoSaTa$B6@VE8eiAS@gtNc25FcyaFyGS^tMRw!E39S8FkCD@DqtxAJow3uyr*Ndp^ypQNEF",
  cwd: __dirname
})

export default store

export const initCredentialsStore = () => {
  const secrets = Buffer.from(fs.readFileSync(__dirname + "/secrets.json")).toString();
  var secretsJson = JSON.parse(secrets) as Array<KeyValue<string, string>>;
  secretsJson.forEach(keyValue => {
    store.set(keyValue.key as any, keyValue.value);
  })
  //store.set("TGDB_KEY", "9207af5e9f0f3998d4c683f49ed0645863bc766c9b682e82280a96ccffd899d1");
}