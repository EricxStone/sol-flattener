# Sol-Flattener

This repository consists of a utility which helps to flatten Solidity file for verification.

Git Repo: https://github.com/EricxStone/sol-flattener

NPM: https://www.npmjs.com/package/@ericxstone/sol-flattener

## Usage

There are two ways of using this utilities. You can either import this package to your code or use it as a cli.

To get started, you can follow below steps:

1. Install the package

Using yarn
```
yarn add -D @ericxstone/sol-flattener
```

Using npm
```
npm install @ericxstone/sol-flattener --save-dev
```

2. Use the package as cli

```
yarn flatten-sol ./contracts/yourContract.sol ./node_modules ./output/yourContract_flatten.sol
```

3. Import the package in your code

```typescript
import {flatternFile} from "@ericxstone/sol-flattener"

...

const resultSol: string = flatternFile(path.join(__dirname, "../contracts/yourContract.sol"), path.join(__dirname, "../node_modules"));
```

## The CLI

Use the following command on the cli

```
yarn flatten-sol SOLIDITY_CONTRACT_FILE_PATH NODE_MODULES_FOLDER OUTPUT_FILE_NAME
```

- `SOLIDITY_CONTRACT_FILE_PATH`: The file path of the solidity contract, should work with relative path and full path.
- `NODE_MODULES_FOLDER`: Path to the node_module folder where you have installed the contract dependencies (e.g. openzeppelin).
- `OUTPUT_FILE_NAME`: The path and file name of the flattened solidity file.

## Using Import

When you import this module to your code, you can use the function as follow:
```typescript
flatternFile(contractFilePath: string, libDirPath: string): string
```

The function takes the contract file path and path to the node_modules as argument. The flattened solidity file will be output in string format.

## Development

You may also want to contribute to this library. Follow below steps to setup development environment.

1. Clone this repository
```
git clone https://github.com/EricxStone/sol-flattener
```

2. Install dependencies
```
yarn
```

3. Run test
```
yarn test
```

4. Build Cli
```
yarn build
```

## License

[MIT](LICENSE)

