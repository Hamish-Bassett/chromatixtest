class OrderAccumulator {
  constructor() {
    this.years = {};
  }

  parseData(incomingData) {
    const orderDate = incomingData['Order Date'];
    const orderPriority = incomingData['Order Priority'];

    if (!orderDate) {
      return;
    }
    if (!orderPriority) {
      return;
    }
    const dateComponents = orderDate.split('/');
    if (dateComponents.length !== 3) {
      return;
    }
    const year = dateComponents[2];
    const month = dateComponents[0];
    const day = dateComponents[1];
    this.createMissingYear(year);
    this.createMissingMonth(year, month);
    this.createMissingDay(year, month, day);
    this.createMissingShippingPriority(year, month, day, orderPriority);
    this.years[year][month][day][orderPriority] += 1;
  }

  createMissingShippingPriority(year, month, day, orderPriority) {
    if (!this.years[year][month][day][orderPriority]) {
      this.years[year][month][day][orderPriority] = 0;
    }
  }

  createMissingDay(year, month, day) {
    if (!this.years[year][month][day]) {
      this.years[year][month][day] = {};
    }
  }

  createMissingMonth(year, month) {
    if (!this.years[year][month]) {
      this.years[year][month] = {};
    }
  }

  createMissingYear(year) {
    if (!this.years[year]) {
      this.years[year] = {};
    }
  }
}

module.exports = OrderAccumulator;
