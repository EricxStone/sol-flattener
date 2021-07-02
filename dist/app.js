"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatternFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let importedFile = [];
let importedLibFile = new Map();
function flatternFile(contractFilePath, libDirPath) {
    const fileName = contractFilePath;
    const dirName = path_1.default.dirname(fileName);
    const fileBuffer = fs_1.default.readFileSync(fileName);
    let fileContent = fileBuffer.toString();
    while (true) {
        const importRe = /import \"([a-zA-Z0-9.@\/]+.sol)\"\;/gi;
        const imports = [...fileContent.matchAll(importRe)];
        if (imports.length == 0)
            break;
        for (let i = 0; i < imports.length; i++) {
            const importText = imports[i][0];
            const importFilePath = imports[i][1];
            const importFileName = path_1.default.basename(importFilePath);
            if (importFilePath.indexOf("@") >= 0) {
                const libRe = /(@[a-zA-Z0-9]+)\/[a-zA-Z0-9\/]+.sol/gi;
                const result = libRe.exec(importFilePath);
                if (result != null && result.length > 1) {
                    const libFileContent = handleModuleLibrary(result[1], path_1.default.join(libDirPath, importFilePath));
                    if (importedFile.indexOf(importFileName) >= 0) {
                        fileContent = fileContent.replace(importText, "");
                    }
                    else {
                        fileContent = fileContent.replace(importText, libFileContent);
                    }
                }
            }
            else {
                const importFileBuffer = fs_1.default.readFileSync(path_1.default.join(dirName, importFilePath));
                if (importedFile.indexOf(importFileName) >= 0) {
                    fileContent = fileContent.replace(importText, "");
                }
                else {
                    fileContent = fileContent.replace(importText, importFileBuffer.toString());
                }
            }
            importedFile.push(importFileName);
        }
    }
    let count = 0;
    fileContent = fileContent.replace(/\/\/ SPDX-License-Identifier: [A-Za-z0-9.]+/gi, (x) => {
        if (count == 0) {
            count++;
            return x;
        }
        else {
            count++;
            return "";
        }
    });
    count = 0;
    fileContent = fileContent.replace(/pragma solidity [0-9.>=<^ ]+;/gi, (x) => {
        if (count == 0) {
            count++;
            return x;
        }
        else {
            count++;
            return "";
        }
    });
    return fileContent;
}
exports.flatternFile = flatternFile;
function handleModuleLibrary(libName, filePath) {
    let libs = importedLibFile.get(libName);
    if (libs == null) {
        libs = [];
    }
    const libFileDir = path_1.default.dirname(filePath);
    const libFileBuffer = fs_1.default.readFileSync(filePath);
    let fileContent = libFileBuffer.toString();
    while (true) {
        const re = /import \"([a-zA-Z0-9.@\/]+.sol)\"\;/gi;
        const imports = [...fileContent.matchAll(re)];
        if (imports.length == 0)
            break;
        for (let i = 0; i < imports.length; i++) {
            const importText = imports[i][0];
            const importFilePath = imports[i][1];
            const importFileBuffer = fs_1.default.readFileSync(path_1.default.join(libFileDir, importFilePath));
            const importFileName = path_1.default.basename(importFilePath);
            if (libs.indexOf(importFileName) >= 0) {
                fileContent = fileContent.replace(importText, "");
            }
            else {
                fileContent = fileContent.replace(importText, importFileBuffer.toString());
            }
            libs.push(importFileName);
        }
    }
    importedLibFile.set(libName, libs);
    return fileContent;
}
