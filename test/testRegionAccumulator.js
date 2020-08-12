const chai = require('chai');

const Accumulator = require('../src/regionAccumulator');

const { expect } = chai;

describe('regionAccumulator', () => {
  it('the module should export a constructor', () => {
    expect(Accumulator)
      .to.be.a('function');
  });
  describe('parseData', () => {
    let candidate = {};
    beforeEach(() => {
      candidate = new Accumulator();
    });
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

    const testData2 = {
      Region: 'Sub-Saharan Africa',
      Country: 'Tanzania',
      'Item Type': 'Fruits',
      'Sales Channel': 'Offline',
      'Order Priority': 'H',
      'Order Date': '10/20/2014',
      'Order ID': '156530129',
      'Ship Date': '11/29/2014',
      'Units Sold': '9599',
      'Unit Price': '9.33',
      'Unit Cost': '6.92',
      'Total Revenue': '89558.67',
      'Total Cost': '66425.08',
      'Total Profit': '23133.59',
    };

    it('should have a method called parseData', () => {
      expect(candidate.parseData)
        .to.be.a('function');
    });
    it('should be able to parse incoming data', () => {
      candidate.parseData(testData);
      const expectedProfit = testData['Total Profit'];
      const expectedCost = testData['Total Cost'];
      const expectedRevenue = testData['Total Revenue'];

      expect(candidate.Regions[testData.Region]).to.exist;
      expect(candidate.Regions[testData.Region].Total).to.exist;
      expect(candidate.Regions[testData.Region].Countries).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Revenue)
        .to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Cost)
        .to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Profit)
        .to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country]
        .ItemTypes[testData['Item Type']]).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country]
        .ItemTypes[testData['Item Type']].Revenue).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country]
        .ItemTypes[testData['Item Type']].Cost).to.exist;
      expect(candidate.Regions[testData.Region].Countries[testData.Country]
        .ItemTypes[testData['Item Type']].Profit).to.exist;
      expect(candidate.ItemTypes[testData['Item Type']]).to.exist;
      expect(candidate.ItemTypes[testData['Item Type']].Revenue).to.exist;
      expect(candidate.ItemTypes[testData['Item Type']].Cost).to.exist;
      expect(candidate.ItemTypes[testData['Item Type']].Profit).to.exist;

      expect(candidate.Regions[testData.Region].Total.Revenue.toFixed(2))
        .to.equal(expectedRevenue);
      expect(candidate.Regions[testData.Region].Total.Cost.toFixed(2))
        .to.equal(expectedCost);
      expect(candidate.Regions[testData.Region].Total.Profit.toFixed(2))
        .to.equal(expectedProfit);

      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Revenue.toFixed(2))
        .to.equal(expectedRevenue);
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Cost.toFixed(2))
        .to.equal(expectedCost);
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Profit.toFixed(2))
        .to.equal(expectedProfit);

      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Revenue.toFixed(2))
        .to.equal(expectedRevenue);
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Cost.toFixed(2))
        .to.equal(expectedCost);
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Profit.toFixed(2))
        .to.equal(expectedProfit);

      expect(candidate.ItemTypes[testData['Item Type']].Revenue.toFixed(2)).to.equal(expectedRevenue);
      expect(candidate.ItemTypes[testData['Item Type']].Cost.toFixed(2)).to.equal(expectedCost);
      expect(candidate.ItemTypes[testData['Item Type']].Profit.toFixed(2)).to.equal(expectedProfit);
    });
    it('should correctly accumulate data a single Regions and item type', () => {
      candidate.parseData(testData);
      candidate.parseData(testData2);

      const expectedProfit = (parseFloat(testData['Total Profit'], 10) + parseFloat(testData2['Total Profit'], 10)).toFixed(2);
      const expectedCost = (parseFloat(testData['Total Cost'], 10) + parseFloat(testData2['Total Cost'], 10)).toFixed(2);
      const expectedRevenue = (parseFloat(testData['Total Revenue'], 10) + parseFloat(testData2['Total Revenue'], 10)).toFixed(2);

      expect(candidate.Regions[testData.Region].Total.Revenue.toFixed(2))
        .to.equal(expectedRevenue);
      expect(candidate.Regions[testData.Region].Total.Cost.toFixed(2))
        .to.equal(expectedCost);
      expect(candidate.Regions[testData.Region].Total.Profit.toFixed(2))
        .to.equal(expectedProfit);

      expect(candidate.ItemTypes[testData['Item Type']].Revenue.toFixed(2)).to.equal(expectedRevenue);
      expect(candidate.ItemTypes[testData['Item Type']].Cost.toFixed(2)).to.equal(expectedCost);
      expect(candidate.ItemTypes[testData['Item Type']].Profit.toFixed(2)).to.equal(expectedProfit);
    });

    it('should be able to convert data to a string', () => {
      candidate.parseData(testData);
      candidate.convertNumbersToString();

      expect(candidate.Regions[testData.Region].Total.Profit).to.be.a('string');
      expect(candidate.Regions[testData.Region].Total.Cost).to.be.a('string');
      expect(candidate.Regions[testData.Region].Total.Revenue).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Profit).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Cost).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].Total.Revenue).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Profit).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Cost).to.be.a('string');
      expect(candidate.Regions[testData.Region].Countries[testData.Country].ItemTypes[testData['Item Type']].Revenue).to.be.a('string');
      expect(candidate.ItemTypes[testData['Item Type']].Profit).to.be.a('string');
      expect(candidate.ItemTypes[testData['Item Type']].Cost).to.be.a('string');
      expect(candidate.ItemTypes[testData['Item Type']].Revenue).to.be.a('string');

    });
  });
});
