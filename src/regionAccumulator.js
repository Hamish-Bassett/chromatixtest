const Big = require('big.js'); // needed for precise calculations.

class Total {
  constructor() {
    this.Revenue = 0;
    this.Cost = 0;
    this.Profit = 0;
  }

  updateValues(updateRevenue, updateCost, updateProfit) {
    this.Profit = this.accumulateData(this.Profit, updateProfit);
    this.Cost = this.accumulateData(this.Cost, updateCost);
    this.Revenue = this.accumulateData(this.Revenue, updateRevenue);
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

  convertToStrings() {
    this.Revenue = this.Revenue.toFixed(2);
    this.Cost = this.Cost.toFixed(2);
    this.Profit = this.Profit.toFixed(2);
  }
}

class RegionTotal {
  constructor() {
    this.Total = new Total();
    this.Countries = {};
  }

  updateValues(updateRevenue, updateCost, updateProfit, country, itemType) {
    this.Total.updateValues(updateRevenue, updateCost, updateProfit);
    if (!this.Countries[country]) {
      return;
    }
    this.Countries[country].updateValues(updateRevenue, updateCost, updateProfit, itemType);
  }
}

class CountryTotal {
  constructor() {
    this.Total = new Total();
    this.ItemTypes = {};
  }

  updateValues(updateRevenue, updateCost, updateProfit, itemType) {
    this.Total.updateValues(updateRevenue, updateCost, updateProfit);
    if (!this.ItemTypes[itemType]) {
      return;
    }
    this.ItemTypes[itemType].updateValues(updateRevenue, updateCost, updateProfit);
  }
}

class RegionAccumulator {
  constructor() {
    this.Regions = {};
    this.ItemTypes = {};
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
    this.Regions[regionName].updateValues(totalRevenue, totalCost, totalProfit, countryName, itemType);
    this.ItemTypes[itemType].updateValues(totalRevenue, totalCost, totalProfit);
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
      this.Regions[regionName].Countries[countryName] = new CountryTotal();
    }
  }

  createMissingRegion(regionName) {
    if (!this.Regions[regionName]) {
      this.Regions[regionName] = new RegionTotal();
    }
  }

  convertNumbersToString() {
    const regionsKeys = Object.keys(this.Regions);
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
