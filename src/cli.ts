#!/usr/bin/env node

import fs from "fs";
import path from "path";
import {flatternFile} from "./app"

const [,, ...args] = process.argv;

if (args.length < 3){
    console.error("Require at least 3 argument to proceed");
    process.exit(1);
}

if (args[0] === undefined || args[0] === ""){
    console.error("Contract file path is not provided");
    process.exit(1);
}

if (args[1] === undefined || args[1] === ""){
    console.error("Node Modules folder path is not provided");
    process.exit(1);
}

if (args[2] === undefined || args[2] === ""){
    console.error("Output path is not provided");
    process.exit(1);
}

const filePath = args[0];
const libFolderPath = args[1]
const outputFilePath = args[2];

const flattenedString: string = flatternFile(filePath, libFolderPath);
if (!fs.existsSync(path.dirname(outputFilePath))) fs.mkdirSync(path.dirname(outputFilePath))
fs.writeFileSync(outputFilePath, flattenedString)

console.log(`Flattened file ${filePath} and saved to ${outputFilePath}`);
