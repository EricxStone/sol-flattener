import fs from "fs"
import path from "path"

let importedFile: string[] = []
let importedLibFile: Map<string, string[]> = new Map()

export function flatternFile(contractFilePath: string, libDirPath: string): string {
    const fileName = contractFilePath;
    const dirName = path.dirname(fileName)
    const fileBuffer = fs.readFileSync(fileName);
    let fileContent = fileBuffer.toString();
    while(true){
        const importRe = /import \"([a-zA-Z0-9.@\/]+.sol)\"\;/gi
        const imports = [...fileContent.matchAll(importRe)];
        if (imports.length == 0) break;
        for (let i = 0; i < imports.length; i++){
            const importText = imports[i][0];
            const importFilePath = imports[i][1];
            const importFileName = path.basename(importFilePath);
            if (importFilePath.indexOf("@") >= 0) {
                const libRe = /(@[a-zA-Z0-9]+)\/[a-zA-Z0-9\/]+.sol/gi
                const result = libRe.exec(importFilePath)
                if (result != null && result.length > 1){
                    const libFileContent = handleModuleLibrary(result[1], path.join(libDirPath, importFilePath))
                    if (importedFile.indexOf(importFileName) >= 0){
                        fileContent = fileContent.replace(importText, "");
                    } else{
                        fileContent = fileContent.replace(importText, libFileContent);
                    }
                }
            } else {
                const importFileBuffer = fs.readFileSync(path.join(dirName, importFilePath));
                if (importedFile.indexOf(importFileName) >= 0){
                    fileContent = fileContent.replace(importText, "");
                } else{
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
        } else {
            count++;
            return "";
        }
    });
    count = 0;
    fileContent = fileContent.replace(/pragma solidity [0-9.>=<^ ]+;/gi, (x) => {
        if (count == 0) {
            count++;
            return x;
        } else {
            count++;
            return "";
        }
    });
    return fileContent
}

function handleModuleLibrary(libName: string, filePath: string): string{
    let libs = importedLibFile.get(libName);
    if (libs == null) {
        libs = []
    }
    const libFileDir = path.dirname(filePath)
    const libFileBuffer= fs.readFileSync(filePath);
    let fileContent = libFileBuffer.toString()
    while(true){
        const re = /import \"([a-zA-Z0-9.@\/]+.sol)\"\;/gi
        const imports = [...fileContent.matchAll(re)];
        if (imports.length == 0) break;
        for (let i = 0; i < imports.length; i++){
            const importText = imports[i][0];
            const importFilePath = imports[i][1];
            const importFileBuffer = fs.readFileSync(path.join(libFileDir, importFilePath));
            const importFileName = path.basename(importFilePath);
            if (libs.indexOf(importFileName) >= 0){
                fileContent = fileContent.replace(importText, "");
            } else{
                fileContent = fileContent.replace(importText, importFileBuffer.toString());
            }
            libs.push(importFileName)
        }
    }
    importedLibFile.set(libName, libs);
    return fileContent;
}
