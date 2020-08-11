const chai = require('chai');

const importFile = require("../src/importFile");

const { expect } = chai;
chai.should();

describe("importFile", () => {
    it('should export a function', () => {
        importFile.should.be.a('function');
    });
});
