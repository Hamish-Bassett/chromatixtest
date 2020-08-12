const chai = require('chai');

const ShippingTimeAccumulator = require('../src/shippingTimeAccumulator');

const { expect } = chai;

describe('OrderAccumulator', () => {
  it('should export a constructor', () => {
    expect(ShippingTimeAccumulator).to.be.a('function');
  });
  it('should have a collection of dates', () => {
    const candidate = new ShippingTimeAccumulator();
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
      'Ship Date': '7/29/2012',
      'Units Sold': '1593',
      'Unit Price': '9.33',
      'Unit Cost': '6.92',
      'Total Revenue': '14862.69',
      'Total Cost': '11023.56',
      'Total Profit': '3839.13',
    };
    beforeEach(() => {
      candidate = new ShippingTimeAccumulator();
    });
    it('should have a method called parseData', () => {
      expect(candidate.parseData).to.be.a('function');
    });
    it('should be able to injest a data frame', () => {
      candidate.parseData(testData);
      const dateSections = testData['Ship Date'].split('/');
      expect(candidate.years[dateSections[2]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].AvgDaysToShip).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].NumberOfOrders).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].AvgDaysToShip).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].NumberOfOrders).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries[testData.Country]).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries[testData.Country].AvgDaysToShip).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries[testData.Country].NumberOfOrders).to.exist;
      expect(candidate.years[dateSections[2]][dateSections[0]].TotalShippingDays).to.equal(1);
      expect(candidate.years[dateSections[2]][dateSections[0]].NumberOfOrders).to.equal(1);
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].TotalShippingDays).to.equal(1);
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].NumberOfOrders).to.equal(1);
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries[testData.Country].TotalShippingDays).to.equal(1);
      expect(candidate.years[dateSections[2]][dateSections[0]].Regions[testData.Region].Countries[testData.Country].NumberOfOrders).to.equal(1);

    });
  });
  describe('getDaysToShip', () => {
    let candidate;
    beforeEach(() => {
      candidate = new ShippingTimeAccumulator();
    });
    it('should have a method called getDaysToShip', () => {
      expect(candidate.getDaysToShip).to.be.a('function');
    });
    it('should take 2 strings', () => {
      expect(() => { candidate.getDaysToShip(); }).to.throw();
      expect(() => { candidate.getDaysToShip('foo'); }).to.throw();
    });
    it('should return 0 if the same day', () => {
      const date = '7/28/2012';
      expect(candidate.getDaysToShip(date, date)).to.equal(0);
    });
    it('should return 1 if the next day', () => {
      const date = '7/28/2012';
      const endDate = '7/29/2012';
      expect(candidate.getDaysToShip(date, endDate)).to.equal(1);
    });
    it('should return 1 if the days are reversed', () => {
      const date = '7/28/2012';
      const endDate = '7/29/2012';
      expect(candidate.getDaysToShip(endDate, date)).to.equal(1);
    });
    it('should return 365 if the next year', () => {
      const date = '7/28/2012';
      const endDate = '7/28/2013';
      expect(candidate.getDaysToShip(endDate, date)).to.equal(365);
    });
  });
});
