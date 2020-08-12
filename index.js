const getFileReader = require('./src/getFileStream');
const ParseCSV = require('./src/parseCSV');
const RegionAccumulator = require('./src/regionAccumulator');
const OrderAccumulator = require('./src/orderAccumulator');
const ShippingDateAccumulator = require('./src/shippingTimeAccumulator');
const outputObject = require('./src/writeOutput');

const filePath = 'target.csv';

const fileStream = getFileReader(filePath);
const csvParser = new ParseCSV();
const regionAccumulator = new RegionAccumulator();
const orderAccumulator = new OrderAccumulator();
const shippingTimeAccumulator = new ShippingDateAccumulator();

csvParser.on('data', (data) => {
  regionAccumulator.parseData(data);
  orderAccumulator.parseData(data);
  shippingTimeAccumulator.parseData(data);
})
  .on('end', () => {
    regionAccumulator.convertNumbersToString();
    outputObject(regionAccumulator, 'task1.json');
    outputObject(orderAccumulator.years, 'task2.json');
    outputObject(shippingTimeAccumulator.years, 'task3.json');
  });

csvParser.parseCSV(fileStream);
