class OrderAccumulator {
  constructor() {
    this.years = {};
  }

  parseData(incomingData) {
    const orderDate = incomingData['Order Date'];
    if (!orderDate) {
      return;
    }
    const dateComponents = orderDate.split('/');
    if (dateComponents.length !== 3) {
      return;
    }
    const year = dateComponents[2];
    const month = dateComponents[0];
    const day = dateComponents[1];
    if (!this.years[year]) {
      this.years[year] = {};
    }
    if (!this.years[year][month]) {
      this.years[year][month] = {};
    }
    if (!this.years[year][month][day]) {
      this.years[year][month][day] = {};
    }
    if (!this.years[year][month][day][incomingData['Order Priority']]) {
      this.years[year][month][day][incomingData['Order Priority']] = 0;
    }
    this.years[year][month][day][incomingData['Order Priority']] += 1;
  }
}

module.exports = OrderAccumulator;
