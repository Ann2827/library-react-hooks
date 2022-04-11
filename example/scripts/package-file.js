const { readdirSync, readFileSync, writeFileSync} = require('fs');
const path = require("path");

const rootPath = '../../';
const currentPath = '../';

let rootPackage = readFileSync(path.resolve(__dirname, `${rootPath}package.json`), 'utf8');

console.log('rootPackage.version', JSON.parse(rootPackage).version);
