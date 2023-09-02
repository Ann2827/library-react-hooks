const { TextEncoder } = require("util");
// import { TextEncoder } from 'util';

module.exports = {
  collectCoverageFrom: [
    "./src/**/**/*.ts"
  ],
  rootDir: "./",
  modulePathIgnorePatterns: [
    "/node_modules/",
    "/.github/",
    "/dist/",
  ],
  globals: {
    "TextEncoder": TextEncoder
  },
  roots: ["<rootDir>/src/", "<rootDir>/__mocks__/"],
  transform: {
    "\\.ts$": ["babel-jest", { configFile: "./babel-jest.config.js" }]
  }
};
