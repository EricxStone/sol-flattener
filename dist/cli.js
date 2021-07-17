#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_1 = require("./app");
const [, , ...args] = process.argv;
if (args.length < 3) {
    console.error("Require at least 3 argument to proceed");
    process.exit(1);
}
if (args[0] === undefined || args[0] === "") {
    console.error("Contract file path is not provided");
    process.exit(1);
}
if (args[1] === undefined || args[1] === "") {
    console.error("Node Modules folder path is not provided");
    process.exit(1);
}
if (args[2] === undefined || args[2] === "") {
    console.error("Output path is not provided");
    process.exit(1);
}
const filePath = args[0];
const libFolderPath = args[1];
const outputFilePath = args[2];
const flattenedString = app_1.flatternFile(filePath, libFolderPath);
if (!fs_1.default.existsSync(path_1.default.dirname(outputFilePath)))
    fs_1.default.mkdirSync(path_1.default.dirname(outputFilePath));
fs_1.default.writeFileSync(outputFilePath, flattenedString);
console.log(`Flattened file ${filePath} and saved to ${outputFilePath}`);
