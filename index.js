const getFileReader = require('./src/getFileStream');
const ParseCSV = require('./src/parseCSV');
const RegionAccumulator = require('./src/regionAccumulator');
const outputObject = require('./src/writeOutput');

const filePath = 'target.csv';

const fileStream = getFileReader(filePath);
const csvParser = new ParseCSV();
const accumulator = new RegionAccumulator();

csvParser.on('data', (data) => {
  accumulator.parseData(data);
})
  .on('end', () => {
    accumulator.convertNumbersToString();
    outputObject(accumulator, 'task1.json');
  });

csvParser.parseCSV(fileStream);
