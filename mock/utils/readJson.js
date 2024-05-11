import fs from 'fs';
import path from 'path';

function readJson(filePath, dirname) {
  filePath = filePath.replace('.json', '');
  let url = `./mock/${filePath}.json`;
  if (dirname) {
    url = path.resolve(dirname, filePath) + '.json';
  }
  const data = fs.readFileSync(url).toString();
  const json = JSON.parse(data);
  if (!json.zUseMocker) {
    json.zUseMocker = true;
    json.zUseMockerTime = new Date();
    json.zUseMockerPlatform = 'OSP';
  }
  return json;
}

function getJson(filePath, dirname) {
  filePath = filePath.replace('.json', '');
  let url = `./mock/${filePath}.json`;
  if (dirname) {
    url = path.resolve(dirname, filePath) + '.json';
  }
  const data = fs.readFileSync(url).toString();
  const json = JSON.parse(data);
  return json;
}

export { readJson, getJson };
