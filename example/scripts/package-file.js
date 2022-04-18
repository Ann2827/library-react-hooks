const { readdirSync, readFileSync, writeFileSync} = require('fs');
const path = require("path");
// https://habr.com/ru/post/133363/
// key words npm package local path file

// Только для запуска с npm ci

// TODO: лучше бы получать адрес rootPath
const rootPath = '../../';
const currentPath = '../';

// Проверить наличие обоих package-lock
// List: В current package-lock состаавить список зависимостей с file в packages[''].dependencies and packages[''].devDependencies
// Перебираю List
// Requires: Ищу в dependencies['@testing-library/jest-dom'].requires
// Перебираю Requires
// Ищу в dependencies['css.escape']
// Если не нахожу, то иду в root package-lock, ищу dependencies['css.escape'] version и requires
// Далее создаю в current packages
// "../node_modules/@types/scheduler": {
//   "version": "0.16.2",
//     "requires": {}
// },
// "node_modules/@types/scheduler": {
//   "resolved": "../node_modules/@types/scheduler",
//     "link": true
// },
// Даалее создаю в current dependencies
// "@types/scheduler": {
//   "version": "file:../node_modules/@types/scheduler",
//     "requires": {}
// },

let rootPackage = readFileSync(path.resolve(__dirname, `${rootPath}package.json`), 'utf8');

console.log('rootPackage.version', JSON.parse(rootPackage).version);
