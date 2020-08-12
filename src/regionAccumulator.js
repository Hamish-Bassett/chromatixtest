const Big = require('big.js'); // needed for precise calculations.

const Total = require('./Total');
// accumulator to track incoming data from the parsed CSV.
class RegionAccumulator {
  constructor() {
    this.Regions = {};
    this.ItemTypes = {};
    this.decimalPrecision = 2;
  }

  parseData(data) {
    const regionName = data.Region;
    const countryName = data.Country;
    const itemType = data['Item Type'];
    const totalCost = data['Total Cost'];
    const totalRevenue = data['Total Revenue'];
    const totalProfit = data['Total Profit'];

    if (!totalCost) {
      return;
    }
    if (!totalRevenue) {
      return;
    }
    if (!totalProfit) {
      return;
    }
    if (!itemType) {
      return;
    }
    if (!countryName) {
      return;
    }
    if (!regionName) {
      return;
    }
    this.createMissingRegion(regionName);
    this.createMissingCountry(countryName, regionName);
    this.createMissingItemTypes(itemType, countryName, regionName);
    this.accumulateCountryTotal(countryName, totalProfit, totalCost, totalRevenue, regionName);
    this.accumulateCountryItemTypeTotal(countryName,
      itemType,
      totalProfit,
      totalCost,
      totalRevenue,
      regionName);
    this.accumulateRegionTotal(regionName, totalProfit, totalCost, totalRevenue);
    this.accumulateItemTypeTotal(itemType, totalProfit, totalCost, totalRevenue);
  }

  accumulateItemTypeTotal(itemType, totalProfit, totalCost, totalRevenue) {
    this.ItemTypes[itemType].Profit = this.accumulateData(this.ItemTypes[itemType].Profit, totalProfit);
    this.ItemTypes[itemType].Cost = this.accumulateData(this.ItemTypes[itemType].Cost, totalCost);
    this.ItemTypes[itemType].Revenue = this.accumulateData(this.ItemTypes[itemType].Revenue, totalRevenue);
  }

  accumulateRegionTotal(regionName, totalProfit, totalCost, totalRevenue) {
    this.Regions[regionName].Total.Profit = this.accumulateData(this.Regions[regionName].Total.Profit, totalProfit);
    this.Regions[regionName].Total.Cost = this.accumulateData(this.Regions[regionName].Total.Cost, totalCost);
    this.Regions[regionName].Total.Revenue = this.accumulateData(this.Regions[regionName].Total.Revenue, totalRevenue);
  }

  accumulateCountryItemTypeTotal(countryName, itemType, totalProfit, totalCost, totalRevenue, regionName) {
    this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Profit = this.accumulateData(this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Profit, totalProfit);
    this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Cost = this.accumulateData(this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Cost, totalCost);
    this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Revenue = this.accumulateData(this.Regions[regionName].Countries[countryName].ItemTypes[itemType].Revenue, totalRevenue);
  }

  accumulateCountryTotal(countryName, totalProfit, totalCost, totalRevenue, regionName) {
    this.Regions[regionName].Countries[countryName].Total.Profit = this.accumulateData(this.Regions[regionName].Countries[countryName].Total.Profit, totalProfit);
    this.Regions[regionName].Countries[countryName].Total.Cost = this.accumulateData(this.Regions[regionName].Countries[countryName].Total.Cost, totalCost);
    this.Regions[regionName].Countries[countryName].Total.Revenue = this.accumulateData(this.Regions[regionName].Countries[countryName].Total.Revenue, totalRevenue);
  }

  createMissingItemTypes(itemType, countryName, regionName) {
    if (!this.ItemTypes[itemType]) {
      this.ItemTypes[itemType] = new Total();
    }

    if (!this.Regions[regionName].Countries[countryName].ItemTypes[itemType]) {
      this.Regions[regionName].Countries[countryName].ItemTypes[itemType] = new Total();
    }
  }

  createMissingCountry(countryName, regionName) {
    if (!this.Regions[regionName].Countries[countryName]) {
      this.Regions[regionName].Countries[countryName] = {
        Total: new Total(),
        ItemTypes: {},
      };
    }
  }

  createMissingRegion(regionName) {
    if (!this.Regions[regionName]) {
      this.Regions[regionName] = { Total: new Total(), Countries: {} };
    }
  }

  /**
   * While using inbuilt numbers is much faster, decimals are to be preferred in calculations of money
   * because NodeJS does not have an inherent decimal type we have to use a library.
   *
   * If accuracy is not required we can move to inbuilt float type however in the financial domain
   * this is not best practice.
   */
  accumulateData(rootValue, adder) {
    return Big(rootValue).plus(adder);
  }

  convertNumbersToString() {
    const regionsKeys = Object.keys(this.Regions)
    regionsKeys.forEach((regionsKey) => {
      if (this.Regions[regionsKey]) {
        this.Regions[regionsKey].Total.convertToStrings();
        Object.keys(this.Regions[regionsKey].Countries).forEach((countryKey) => {
          if (this.Regions[regionsKey].Countries[countryKey]) {
            this.Regions[regionsKey].Countries[countryKey].Total.convertToStrings();
            Object.keys(this.Regions[regionsKey].Countries[countryKey].ItemTypes).forEach((itemTypeKey) => {
              if (this.Regions[regionsKey].Countries[countryKey].ItemTypes[itemTypeKey]) {
                this.Regions[regionsKey].Countries[countryKey].ItemTypes[itemTypeKey].convertToStrings();
              }
            });
          }
        });
      }
    });
    Object.keys(this.ItemTypes).forEach((itemTypeKey) => {
      if (this.ItemTypes[itemTypeKey]) {
        this.ItemTypes[itemTypeKey].convertToStrings();
      }
    });
  }
}

module.exports = RegionAccumulator;
