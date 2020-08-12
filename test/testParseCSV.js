const chai = require('chai');
const rewire = require('rewire');
const fs = require('fs');
const mock = require('mock-fs');

const CSVParser = rewire('../src/parseCSV');

const { expect } = chai;

const candidate = new CSVParser();

describe('parseCSV', () => {
  it('the module should export a function', () => {
    expect(candidate.parseCSV).to.be.a('function');
  });
  it('the method should fail if the input is not a ReadStream', () => {
    expect(() => {
      candidate.parseCSV();
    }).to.throw();
  });
  it('should throw an error if the stream errors', () => {
    mock({
      'foo.csv': mock.file({
        content: 'foo, bar\n1, 2\n\n',
      }),
    });
    const fileStream = fs.createReadStream('foo.csv');
    candidate.parseCSV(fileStream);
  });
});
