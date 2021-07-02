import {expect} from 'chai';
import {flatternFile} from '../src/index'
import path from "path"

describe("Solidity Flattener Test", () => {

    it("able to flattern sol files", () => {
        const resultSol: string = flatternFile(path.join(__dirname, "./testSolFile/mainContract.sol"), path.join(__dirname, "../node_modules"));
        // check that MainContract exist and only exist once
        expect(resultSol.indexOf("contract MainContract ") >= 0).to.be.true;
        expect(resultSol.indexOf("contract MainContract ", resultSol.indexOf("contract MainContract ") + 1) < 0).to.be.true;
        // check that MainContract2 exist and only exist once
        expect(resultSol.indexOf("contract MainContract2 ") >= 0).to.be.true;
        expect(resultSol.indexOf("contract MainContract2 ", resultSol.indexOf("contract MainContract2 ") + 1) < 0).to.be.true;
        // check that Interface1 exist and only exist once
        expect(resultSol.indexOf("interface Interface1 ") >= 0).to.be.true;
        expect(resultSol.indexOf("interface Interface1 ", resultSol.indexOf("interface Interface1 ") + 1) < 0).to.be.true;
        // check that Interface2 exist and only exist once
        expect(resultSol.indexOf("interface Interface2 ") >= 0).to.be.true;
        expect(resultSol.indexOf("interface Interface2 ", resultSol.indexOf("interface Interface2 ") + 1) < 0).to.be.true;
        // check that LIB exist and only exist once
        expect(resultSol.indexOf("library LIB ") >= 0).to.be.true;
        expect(resultSol.indexOf("library LIB ", resultSol.indexOf("library LIB ") + 1) < 0).to.be.true;
        // check that LIB2 exist and only exist once
        expect(resultSol.indexOf("library LIB2 ") >= 0).to.be.true;
        expect(resultSol.indexOf("library LIB2 ", resultSol.indexOf("library LIB2 ") + 1) < 0).to.be.true;
        // check that IERC20 exist and only exist once
        expect(resultSol.indexOf("interface IERC20 ") >= 0).to.be.true;
        expect(resultSol.indexOf("interface IERC20 ", resultSol.indexOf("interface IERC20 ") + 1) < 0).to.be.true;
        // check that Context contract exist and only exist once
        expect(resultSol.indexOf("abstract contract Context ") >= 0).to.be.true;
        expect(resultSol.indexOf("abstract contract Context ", resultSol.indexOf("abstract contract Context ") + 1) < 0).to.be.true;
        // check that Pausable contract exist and only exist once
        expect(resultSol.indexOf("abstract contract Pausable ") >= 0).to.be.true;
        expect(resultSol.indexOf("abstract contract Pausable ", resultSol.indexOf("abstract contract Pausable ") + 1) < 0).to.be.true;
        // check that Ownable contract exist and only exist once
        expect(resultSol.indexOf("abstract contract Ownable ") >= 0).to.be.true;
        expect(resultSol.indexOf("abstract contract Ownable ", resultSol.indexOf("abstract contract Ownable ") + 1) < 0).to.be.true;
    });

    it("able to remove duplicate license and compiler declaration", () => {
        const resultSol: string = flatternFile(path.join(__dirname, "./testSolFile/mainContract.sol"), path.join(__dirname, "../node_modules"));
        // check that License exist and only exist once
        expect(resultSol.indexOf("// SPDX-License-Identifier:") >= 0).to.be.true;
        expect(resultSol.indexOf("// SPDX-License-Identifier:", resultSol.indexOf("// SPDX-License-Identifier:") + 1) < 0).to.be.true;
        // check that compiler declaration exist and only exist once
        expect(resultSol.indexOf("pragma solidity") >= 0).to.be.true;
        expect(resultSol.indexOf("pragma solidity", resultSol.indexOf("pragma solidity") + 1) < 0).to.be.true;
    });
});