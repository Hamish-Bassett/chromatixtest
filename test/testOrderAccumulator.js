const chai = require('chai');

const OrderAccumulator = require('../src/orderAccumulator');

const { expect } = chai;

describe('OrderAccumulator', () => {
  it('should export a constructor', () => {
    expect(OrderAccumulator).to.be.a('function');
  });
  it('should have a collection of dates', () => {
    const candidate = new OrderAccumulator();
    expect(candidate.years).to.exist;
  });
  describe('parseData', () => {
    let candidate;
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
      Country: 'South Africa',
      'Item Type': 'Fruits',
      'Sales Channel': 'Offline',
      'Order Priority': 'M',
      'Order Date': '7/27/2013',
      'Order ID': '443368995',
      'Ship Date': '7/28/2012',
      'Units Sold': '1593',
      'Unit Price': '9.33',
      'Unit Cost': '6.92',
      'Total Revenue': '14862.69',
      'Total Cost': '11023.56',
      'Total Profit': '3839.13',
    };
    const testData3 = {
      Region: 'Sub-Saharan Africa',
      Country: 'South Africa',
      'Item Type': 'Fruits',
      'Sales Channel': 'Offline',
      'Order Priority': 'M',
      'Order Date': '7/28/2012',
      'Order ID': '443368995',
      'Ship Date': '7/28/2012',
      'Units Sold': '1593',
      'Unit Price': '9.33',
      'Unit Cost': '6.92',
      'Total Revenue': '14862.69',
      'Total Cost': '11023.56',
      'Total Profit': '3839.13',
    };
    beforeEach(() => {
      candidate = new OrderAccumulator();
    });
    it('should have a method called parseData', () => {
      expect(candidate.parseData).to.be.a('function');
    });
    it('should be able to injest a data frame', () => {
      candidate.parseData(testData);
      const dateSections = testData['Order Date'].split('/');
      const priority = testData['Order Priority'];
      expect(candidate.years[dateSections[2]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority])
        .to.equal(1);
    });
    it('should be able to correctly calculate the number of priorities', () => {
      const expectedCount = 10;
      for (let i = 0; i < expectedCount; i++) {
        candidate.parseData(testData);
      }
      const dateSections = testData['Order Date'].split('/');
      const priority = testData['Order Priority'];
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority])
        .to.equal(expectedCount);
    });
    it('should be able to injest mulitple different data frames', () => {
      candidate.parseData(testData);
      candidate.parseData(testData2);
      const dateSections = testData2['Order Date'].split('/');
      const priority = testData2['Order Priority'];
      expect(candidate.years[dateSections[2]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority])
        .to.equal(1);
    });
    it('should be able to injest mulitple different data frames with different days', () => {
      candidate.parseData(testData);
      candidate.parseData(testData2);
      candidate.parseData(testData3);
      const dateSections = testData2['Order Date'].split('/');
      const priority = testData2['Order Priority'];
      expect(candidate.years[dateSections[2]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]][dateSections[1]][priority])
        .to.equal(1);
    });
  });
});
