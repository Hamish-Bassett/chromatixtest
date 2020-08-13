class ShippingBaseClass {
  constructor() {
    this.AvgDaysToShip = 0;
    this.NumberOfOrders = 0;
    this.TotalShippingDays = 0;
  }

  increaseCount(shippingDays) {
    this.NumberOfOrders += 1;
    this.TotalShippingDays += shippingDays;
    this.updateAverage();
  }

  updateAverage() {
    this.AvgDaysToShip = this.TotalShippingDays / this.NumberOfOrders;
  }
}

class ShippingCountry extends ShippingBaseClass {
}

class ShippingRegion extends ShippingBaseClass {
  constructor() {
    super();
    this.Countries = {};
  }

  increaseCount(shippingDays, country) {
    super.increaseCount(shippingDays);
    if (!this.Countries[country]) {
      return;
    }
    this.Countries[country].increaseCount(shippingDays);
  }
}

class ShippingMonth extends ShippingBaseClass {
  constructor() {
    super();
    this.Regions = {};
  }

  increaseCount(shippingDays, region, country) {
    super.increaseCount(shippingDays);
    if (!this.Regions[region]) {
      return;
    }
    this.Regions[region].increaseCount(shippingDays, country);
  }
}

class ShippingTimeAccumulator {
  constructor() {
    this.years = {};
    this.milisecondsPerDay = 24 * 60 * 60 * 1000;
  }

  getDaysToShip(startDate, endDate) {
    if (typeof startDate !== 'string') {
      throw new Error('startDate must be a string');
    }
    if (typeof endDate !== 'string') {
      throw new Error('startDate must be a string');
    }
    if (startDate === endDate) {
      return 0;
    }
    const startTime = Date.parse(startDate);
    const endTime = Date.parse(endDate);
    const difference = Math.abs(startTime - endTime);
    return Math.round(difference / this.milisecondsPerDay);
  }

  parseData(incomingData) {
    const shipDate = incomingData['Ship Date'];
    const orderDate = incomingData['Order Date'];
    const region = incomingData.Region;
    const country = incomingData.Country;
    if (!shipDate) {
      return;
    }
    if (!region) {
      return;
    }
    if (!country) {
      return;
    }
    const dateComponents = shipDate.split('/');
    if (dateComponents.length !== 3) {
      return;
    }
    const year = dateComponents[2];
    const month = dateComponents[0];
    this.createMissingYear(year);
    this.createMissingMonth(year, month);
    this.createMissingRegion(year, month, region);
    this.createMissingCountry(year, month, region, country);
    this.years[year][month].increaseCount(this.getDaysToShip(orderDate, shipDate), region, country);
  }

  createMissingCountry(year, month, region, country) {
    if (!this.years[year][month].Regions[region].Countries[country]) {
      this.years[year][month].Regions[region].Countries[country] = new ShippingCountry();
    }
  }

  createMissingRegion(year, month, region) {
    if (!this.years[year][month].Regions[region]) {
      this.years[year][month].Regions[region] = new ShippingRegion();
    }
  }

  createMissingMonth(year, month) {
    if (!this.years[year][month]) {
      this.years[year][month] = new ShippingMonth();
    }
  }

  createMissingYear(year) {
    if (!this.years[year]) {
      this.years[year] = {};
    }
  }
}

module.exports = ShippingTimeAccumulator;
