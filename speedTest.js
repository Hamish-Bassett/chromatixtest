const testData = {
  Region: 'Sub-Saharan Africa',
  Country: 'South Africa',
  'Item Type': 'Fruits',
  'Sales Channel': 'Offline',
  'Order Priority': 'M',
  'Order Date': '7/27/2012',
  'Order ID': '443368995',
  'Ship Date': '7/28/2012',
  'Units Sold': '1593',
  'Unit Price': '9.33',
  'Unit Cost': '6.92',
  'Total Revenue': '14862.69',
  'Total Cost': '11023.56',
  'Total Profit': '3839.13',
};

const Accumulator = require('./src/regionAccumulator');

const candidate = new Accumulator();

console.time('1.6 million executions');
for (let i = 0; i < 1600000; i += 1) {
  candidate.parseData(testData);
}
console.timeEnd('1.6 million executions');
