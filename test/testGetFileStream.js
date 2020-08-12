const chai = require('chai');
const rewire = require('rewire');
const fs = require('fs');
const mock = require('mock-fs');

const importFileHandler = rewire('../src/getFileStream');

const { expect } = chai;
chai.should();

describe('importFile', () => {
  it('should export a function', () => {
    expect(importFileHandler).to.be.a('function');
  });
  it('should fail if the input is not a string', () => {
    expect(() => { importFileHandler(); }).to.throw();
    expect(() => { importFileHandler(1); }).to.throw();
  });
  it('should fail if the input file is not readable', () => {
    expect(() => { importFileHandler("path doesn't exist"); }).to.throw();
  });
  it('the method should return a fileSystemReader', () => {
    mock({
      file: mock.file({}),
    });
    const res = importFileHandler('file');
    expect(res).to.be.an.instanceOf(fs.ReadStream);
  });
});
